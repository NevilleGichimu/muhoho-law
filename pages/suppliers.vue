<script setup>
useSeoMeta({
  title: "Suppliers",
  ogTitle: "Suppliers",
  description: "Manage your suppliers efficiently.",
  ogDescription: "Keep track of supplier details and orders.",
});

const {
  suppliers,
  getAllSuppliers,
  getSingleSupplier,
  deleteSupplier,
  supplierFormState,
  isEditingSupplier,
} = useSupplier();

const isDrawerOpen = ref(false);

const isDeleteModalOpen = ref(false);

const selectedSupplierId = ref(null);

const response = await getAllSuppliers();

const columns = ref([
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name" },
  { key: "contact_person", label: "Contact person" },
  { key: "phone_number", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "category", label: "Category" },
  { key: "last_contact_date", label: "Last Contacted" },
]);

const openEditDrawer = async (id) => {
  isEditingSupplier.value = true;
  selectedSupplierId.value = id;
  isDrawerOpen.value = true;

  // Fetch the supplier data and update the form state
  const { data } = await getSingleSupplier(id);
  if (data) {
    supplierFormState.value = { ...data };
  }
};

const refreshSuppliers = async () => {
  isDrawerOpen.value = false;
  await getAllSuppliers();
};

const confirmDelete = (id) => {
  selectedSupplierId.value = id;
  isDeleteModalOpen.value = true;
};

const handleDelete = async () => {
  if (selectedSupplierId.value) {
    await deleteSupplier(selectedSupplierId.value);
    await getAllSuppliers(); // Refresh list after deletion
  }
  isDeleteModalOpen.value = false;
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Suppliers</h1>
      <UButton color="primary" @click="isDrawerOpen = true">
        Add Supplier
      </UButton>
    </div>

    <UCard>
      <SharedDatagrid :columns="columns" :rows="suppliers">
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

    <SharedDrawer v-model="isDrawerOpen" title="Edit Supplier">
      <FormsSupplierForm @cancel="refreshSuppliers" />
    </SharedDrawer>

    <SharedModal
      :show="isDeleteModalOpen"
      message="Are you sure you want to delete this supplier?"
      @confirm="handleDelete"
      @close="isDeleteModalOpen = false"
    />
  </div>
</template>
