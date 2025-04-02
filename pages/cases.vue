<script setup>
useSeoMeta({
  title: "Cases",
  ogTitle: "Cases",
  description: "View and manage case profiles.",
  ogDescription: "Track case interactions and order history.",
});

const {
  cases,
  getAllCases,
  getSingleCase,
  deleteCase,
  caseFormState,
  isEditingCase,
} = useCase();

const isDrawerOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedCaseId = ref(null);

const response = await getAllCases();

const columns = ref([
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name" },
  { key: "address", label: "Address" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
]);

const openEditDrawer = async (id) => {
  isEditingCase.value = true;
  selectedCaseId.value = id;
  isDrawerOpen.value = true;

  // Fetch the case data and update the form state
  const { data } = await getSingleCase(id);
  if (data) {
    caseFormState.value = { ...data };
  }
};

const refreshCases = async () => {
  isDrawerOpen.value = false;
  await getAllCases();
};

const confirmDelete = (id) => {
  selectedCaseId.value = id;
  isDeleteModalOpen.value = true;
};

const handleDelete = async () => {
  if (selectedCaseId.value) {
    await deleteCase(selectedCaseId.value);
    await getAllCases(); // Refresh list after deletion
  }
  isDeleteModalOpen.value = false;
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Cases</h1>
      <UButton color="primary" @click="isDrawerOpen = true">
        Add Case
      </UButton>
    </div>

    <UCard>
      <SharedDatagrid :columns="columns" :rows="cases">
        <template #actions="{ row }">
          <div class="flex space-x-2">
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

    <SharedDrawer v-model="isDrawerOpen" title="Edit Case">
      <FormsCasesForm @cancel="refreshCases" />
    </SharedDrawer>

    <SharedModal
      :show="isDeleteModalOpen"
      message="Are you sure you want to delete this case?"
      @confirm="handleDelete"
      @close="isDeleteModalOpen = false"
    />
  </div>
</template>
