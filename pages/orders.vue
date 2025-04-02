<script setup>
useSeoMeta({
  title: "Orders",
  ogTitle: "Orders",
  description: "Manage your orders efficiently.",
  ogDescription: "Track and manage your orders easily.",
});

const {
  employees,
  getAllEmployees,
  getSingleEmployee,
  deleteEmployee,
  employeeFormState,
  isEditingEmployee,
} = useEmployee();

const isDrawerOpen = ref(false);

const isDeleteModalOpen = ref(false);

const selectedEmployeeId = ref(null);

const response = await getAllEmployees();

const columns = ref([
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status" },
  { key: "hired_date", label: "Hired Date" },
]);

const openEditDrawer = async (id) => {
  isEditingEmployee.value = true;
  selectedEmployeeId.value = id;
  isDrawerOpen.value = true;

  // Fetch the employee data and update the form state
  const { data } = await getSingleEmployee(id);
  if (data) {
    employeeFormState.value = { ...data };
  }
};

const refreshEmployees = async () => {
  isDrawerOpen.value = false;
  await getAllEmployees();
};

const confirmDelete = (id) => {
  selectedEmployeeId.value = id;
  isDeleteModalOpen.value = true;
};

const handleDelete = async () => {
  if (selectedEmployeeId.value) {
    await deleteEmployee(selectedEmployeeId.value);
    await getAllEmployees(); // Refresh list after deletion
  }
  isDeleteModalOpen.value = false;
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Orders</h1>
      <UButton color="primary" @click="isDrawerOpen = true">
        Add Employee
      </UButton>
    </div>

    <UCard>
      <SharedDatagrid :columns="columns" :rows="employees">
        <template #actions="{ row }">
          <div class="">
            <UButton
              icon="mdi:pencil"
              size="xs"
              @click="openEditDrawer(row.id)"
            />
            <UButton
              icon="mdi:trash-can"
              color="red"
              size="xs"
              @click="confirmDelete(row.id)"
            />
          </div>
        </template>

        <template #status="{ row }">
          <UBadge
            v-if="row.status === 'Active' || row.status === 'active'"
            color="green"
          >
            {{ row.status }}
          </UBadge>

          <UBadge
            v-else-if="row.status === 'Inactive' || row.status === 'inactive'"
            color="red"
          >
            {{ row.status }}
          </UBadge>
        </template>
      </SharedDatagrid>
    </UCard>

    <SharedDrawer v-model="isDrawerOpen" title="Edit Employee">
      <FormsEmployeeForm @cancel="refreshEmployees" />
    </SharedDrawer>

    <SharedModal
      :show="isDeleteModalOpen"
      message="Are you sure you want to delete this employee?"
      @confirm="handleDelete"
      @close="isDeleteModalOpen = false"
    />
  </div>
</template>
