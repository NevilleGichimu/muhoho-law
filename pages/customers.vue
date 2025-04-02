<script setup>
useSeoMeta({
  title: "Customers",
  ogTitle: "Customers",
  description: "View and manage customer profiles.",
  ogDescription: "Track customer interactions and order history.",
});

const {
  customers,
  getAllCustomers,
  getSingleCustomer,
  deleteCustomer,
  customerFormState,
  isEditingCustomer,
} = useCustomer();

const isDrawerOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedCustomerId = ref(null);

const response = await getAllCustomers();

const columns = ref([
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name" },
  { key: "address", label: "Address" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
]);

const openEditDrawer = async (id) => {
  isEditingCustomer.value = true;
  selectedCustomerId.value = id;
  isDrawerOpen.value = true;

  // Fetch the customer data and update the form state
  const { data } = await getSingleCustomer(id);
  if (data) {
    customerFormState.value = { ...data };
  }
};

const refreshCustomers = async () => {
  isDrawerOpen.value = false;
  await getAllCustomers();
};

const confirmDelete = (id) => {
  selectedCustomerId.value = id;
  isDeleteModalOpen.value = true;
};

const handleDelete = async () => {
  if (selectedCustomerId.value) {
    await deleteCustomer(selectedCustomerId.value);
    await getAllCustomers(); // Refresh list after deletion
  }
  isDeleteModalOpen.value = false;
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Customers</h1>
      <UButton color="primary" @click="isDrawerOpen = true">
        Add Customer
      </UButton>
    </div>

    <UCard>
      <SharedDatagrid :columns="columns" :rows="customers">
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
      </SharedDatagrid>
    </UCard>

    <SharedDrawer v-model="isDrawerOpen" title="Edit Customer">
      <FormsCustomersForm @cancel="refreshCustomers" />
    </SharedDrawer>

    <SharedModal
      :show="isDeleteModalOpen"
      message="Are you sure you want to delete this customer?"
      @confirm="handleDelete"
      @close="isDeleteModalOpen = false"
    />
  </div>
</template>
