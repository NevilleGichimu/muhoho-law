<script setup>
import { useProduct } from "@/composables/useProduct";


const { createProduct, updateProduct, productFormState } = useProduct();
const emit = defineEmits(["save", "cancel"]);

const handleSubmit = async () => {
  let response;

  if (productFormState.value.id) {
    response = await updateProduct(
      productFormState.value.id,
      productFormState.value
    );
  } else {
    response = await createProduct(productFormState.value);
  }

  if (response.success) {
    emit("save", response.data);
  }
  emit("cancel");
};
</script>

<template>
  <UForm @submit.prevent="handleSubmit" :state="productFormState">
    <UFormGroup class="py-3" label="Name" name="name">
      <UInput v-model="productFormState.name" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Description" name="description">
      <UInput v-model="productFormState.description" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Price" name="price">
      <UInput v-model="productFormState.price" type="number" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Stock" name="stock">
      <UInput v-model="productFormState.stock" type="number" />
    </UFormGroup>

    <UFormGroup class="py-3" label="Category" name="category">
      <UInput v-model="productFormState.category" />
    </UFormGroup>

    <div class="flex justify-end space-x-2">
      <UButton color="gray" @click="$emit('cancel')">Cancel</UButton>
      <UButton color="primary" type="submit">Save</UButton>
    </div>
  </UForm>
</template>
