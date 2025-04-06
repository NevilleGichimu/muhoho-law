<script setup>
const { createTask, updateTask, taskFormState } = useTask();
const emit = defineEmits(["save", "cancel"]);

const handleSubmit = async () => {
  let response;

  if (taskFormState.value.id) {
    response = await updateTask(taskFormState.value.id, taskFormState.value);
  } else {
    response = await createTask(taskFormState.value);
  }

  if (response.success) {
    emit("save", response.data);
  }
  emit("cancel");
};

const priorityLevels = ref(["High", "Medium", "Low"]);

const statusLevels = ref(["Draft", "In Progress", "Completed"]);
</script>

<template>
  <UForm @submit.prevent="handleSubmit" :state="taskFormState">
    <UFormGroup class="py-3" label="Title" name="title">
      <UInput v-model="taskFormState.title" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Description" name="description">
      <UInput v-model="taskFormState.description" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Priority" name="priority">
      <USelectMenu
        v-model="memoFormState.priority"
        :options="priorityLevels"
        placeholder="Select Priority"
        searchable
      />
    </UFormGroup>

    <UFormGroup class="py-3" label="Due Date" name="due_date">
      <UInput v-model="taskFormState.due_date" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Status" name="status">
      <USelectMenu
        v-model="memoFormState.status"
        :options="statusLevels"
        placeholder="Select Status"
        searchable
      />
    </UFormGroup>

    <div class="flex justify-end space-x-2">
      <UButton color="gray" @click="$emit('cancel')">Cancel</UButton>
      <UButton color="primary" type="submit">Save</UButton>
    </div>
  </UForm>
</template>
