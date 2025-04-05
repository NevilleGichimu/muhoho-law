<script setup>
const { updateCase, createCase, caseFormState, isEditingCase } = useCase();
const emit = defineEmits(["save", "cancel"]);

const handleSubmit = async () => {
  let response;

  if (isEditingCase.value) {
    response = await updateCase(caseFormState.value.id, caseFormState.value);
  } else {
    response = await createCase(caseFormState.value);
  }

  if (response.success) {
    isEditingCase.value = false;
  }

  await emit("cancel");
};
</script>

<template>
  <UForm @submit.prevent="handleSubmit" :state="caseFormState">
    <UFormGroup class="py-3" label="Case Number" name="case_number">
      <UInput v-model="caseFormState.case_number" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Title" name="case_title">
      <UInput v-model="caseFormState.case_title" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Case Stage" name="case_stage">
      <UInput v-model="caseFormState.case_stage" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Status" name="status">
      <UInput v-model="caseFormState.status" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Case Type" name="case_type">
      <UInput v-model="caseFormState.case_type" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Client" name="client_id">
      <UInput v-model="caseFormState.client_id" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Description" name="description">
      <UTextarea v-model="caseFormState.description" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Lead Lawyer" name="lead_lawyer_id">
      <UInput v-model="caseFormState.lead_lawyer_id" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Lead Lawyer" name="lead_lawyer_id">
      <UInput v-model="caseFormState.lead_lawyer_id" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Opposing Lawyer" name="opposing_lawyer">
      <UInput v-model="caseFormState.opposing_lawyer" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Filed Date" name="filed_date">
      <UInput v-model="caseFormState.filed_date" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Opposing Party" name="opposing_party">
      <UInput v-model="caseFormState.opposing_party" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Billing Status" name="billing_status">
      <UInput v-model="caseFormState.billing_status" />
    </UFormGroup>

    <div class="flex justify-end space-x-2">
      <UButton color="gray" @click="$emit('cancel')">Cancel</UButton>
      <UButton color="primary" type="submit">Save</UButton>
    </div>
  </UForm>
</template>
