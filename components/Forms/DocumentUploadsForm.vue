<script setup lang="ts">
// Composables for case operations and user data
const {
  updateDocumentUpload,
  createDocumentUpload,
  document_uploadsFormState,
  isEditingDocumentUpload,
} = useDocumentUploads();
const { getAllUsers } = useUsers();
const toast = useToast();

const { uploadDocuments } = useSupabaseDocuments();

const selectedFiles = ref<File[]>([]);

// Emits for handling events
const emit = defineEmits(["save", "cancel"]);

const { getAllCases } = useCase();

const cases = ref<{ id: number; name: string }[]>([]); // or whatever your case structure is

onMounted(async () => {
  const response = await getAllCases();

  cases.value = response.map((c: any) => ({
    label: c.title || `Case #${c.id}`, // adjust this depending on your case fields
    value: c.id,
  }));
});

// Computed binding that syncs selected case ID to full option and vice versa
const selectedCase = computed({
  get() {
    return (
      cases.value.find(
        (option) => option.value === document_uploadsFormState.value.case_id
      ) ?? null
    );
  },
  set(newOption) {
    document_uploadsFormState.value.case_id = newOption?.value ?? null;
  },
});

const categoryOptions = ref([
  "Contract",
  "Evidence",
  "Court",
  "Compliance",
  "Filing",
]);

// Client and Lead Lawyer options fetched from the backend
const clientOptions = ref<{ label: string; value: string }[]>([]);

const fetchUsers = async () => {
  try {
    const usersResponse = await getAllUsers();
    clientOptions.value = usersResponse.map((user: any) => ({
      label: user.full_name,
      value: user.id,
    }));
    // leadLawyerOptions.value = usersResponse
    //   .filter((user: any) => user.role === "lawyer")
    //   .map((user: any) => ({
    //     label: user.full_name,
    //     value: user.id,
    //   }));
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.add({
      title: "Error",
      description: "Failed to load user options.",
      color: "red",
      id: "user-fetch-error",
    });
  }
};

onMounted(() => {
  fetchUsers();
});

// Computed binding for Client selection
const selectedClient = computed({
  get() {
    return (
      clientOptions.value.find(
        (option) => option.value === document_uploadsFormState.value.author_id
      ) || null
    );
  },
  set(newOption) {
    document_uploadsFormState.value.author_id = newOption
      ? newOption.value
      : null;
  },
});

// Computed binding for Lead Lawyer selection
const selectedLeadLawyer = computed({
  get() {
    return (
      leadLawyerOptions.value.find(
        (option) =>
          option.value === document_uploadsFormState.value.lead_lawyer_id
      ) || null
    );
  },
  set(newOption) {
    document_uploadsFormState.value.lead_lawyer_id = newOption
      ? newOption.value
      : null;
  },
});

// const handleSubmit = async () => {
//   let response;

//   if (document_uploadsFormState.value.id) {
//     response = await updateDocumentUpload(
//       document_uploadsFormState.value.id,
//       document_uploadsFormState.value
//     );
//   } else {
//     response = await createDocumentUpload(document_uploadsFormState.value);
//   }

//   if (response.success) {
//     emit("save", response.data);
//   }
//   emit("cancel");
// };
const handleSubmit = async () => {
  if (selectedFiles.value.length > 0) {
    const uploadedDocs = await uploadDocuments(
      selectedFiles.value,
      "document_uploads"
    );

    if (uploadedDocs.length > 0) {
      document_uploadsFormState.value.public_url = uploadedDocs[0].url;
    }
  }

  let response;

  if (document_uploadsFormState.value.id) {
    response = await updateDocumentUpload(
      document_uploadsFormState.value.id,
      document_uploadsFormState.value
    );
  } else {
    response = await createDocumentUpload(document_uploadsFormState.value);
  }

  if (response.success) {
    emit("save", response.data);
  }

  emit("cancel");
};


</script>

<template>
  <UForm @submit.prevent="handleSubmit" :state="document_uploadsFormState">
    <UFormGroup class="py-3" label="Document Title" name="title">
      <UInput v-model="document_uploadsFormState.title" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Case" name="case_id">
      <USelectMenu
        v-model="selectedCase"
        :options="cases"
        placeholder="Select a case"
      />
    </UFormGroup>

    <!-- Case Stage -->
    <!-- <UFormGroup class="py-3" label="Category" name="category">
      <USelectMenu
        v-model="document_uploadsFormState.category"
        :options="categoryOptions"
        placeholder="Select category"
      />
    </UFormGroup> -->
    <UFormGroup class="py-3" label="Category" name="category">
      <USelectMenu
        v-model="document_uploadsFormState.category"
        :options="categoryOptions"
        placeholder="Select category"
        searchable
      />
    </UFormGroup>

    <!-- Client -->
    <UFormGroup class="py-3" label="Client" name="author_id">
      <USelectMenu
        v-model="selectedClient"
        :options="clientOptions"
        placeholder="Select a Client"
      />
    </UFormGroup>

    <UFormGroup class="py-3" label="Upload Files">
      <input
        type="file"
        multiple
        @change="(e) => (selectedFiles.value = Array.from(e.target.files))"
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </UFormGroup>

    <div class="flex justify-end space-x-2">
      <UButton color="gray" @click="$emit('cancel')">Cancel</UButton>
      <UButton color="primary" type="submit">Save</UButton>
    </div>
  </UForm>
</template>
