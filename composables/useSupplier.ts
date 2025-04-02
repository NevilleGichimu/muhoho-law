import { useToast } from "#imports";

export function useSupplier() {
  const toast = useToast();

  const suppliers = ref([]);

  const supplierFormState = useState("supplier-formstate", () => ({
    name: "",
    contact_person: "",
    phone_number: "",
    email: "",
    address: "",
    category: "",
    suppliers_supplied: [],
    notes: "",
    last_contact_date: ""
    }));

  const getAllSuppliers = async () => {
    try {
      const response = await $fetch<IApiResponse>("/api/suppliers");
      suppliers.value = response.data;

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to fetch suppliers.",
          color: "red",
        });
        return null;
      }

      return response.data;
    } catch (error) {
      console.error("Error in getAllSuppliers:", error);
      toast.add({
        title: "Error",
        description: "Failed to fetch suppliers.",
        color: "red",
      });
      throw error;
    }
  };

  const createSupplier = async (supplierData: any) => {
    try {
      const response = await $fetch<IApiResponse>("/api/suppliers", {
        method: "POST",
        body: supplierData,
      });

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to create supplier.",
          color: "red",
        });
        return null;
      }

      toast.add({
        title: "Success",
        description: "Supplier created successfully!",
        color: "green",
      });
      return response.data;
    } catch (error) {
      console.error("Error in createSupplier:", error);
      toast.add({
        title: "Error",
        description: "Failed to create supplier.",
        color: "red",
      });
      throw error;
    }
  };

  const updateSupplier = async (id: string, supplierData: any) => {
    try {
      const response = await $fetch<IApiResponse>(`/api/suppliers?id=${id}`, {
        method: "PUT",
        body: supplierData,
      });

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to update supplier.",
          color: "red",
        });
        return null;
      }

      toast.add({
        title: "Success",
        description: "Supplier updated successfully!",
        color: "green",
      });
      return response.data;
    } catch (error) {
      console.error("Error in updateSupplier:", error);
      toast.add({
        title: "Error",
        description: "Failed to update supplier.",
        color: "red",
      });
      throw error;
    }
  };

  const deleteSupplier = async (id: string) => {
    try {
      const response = await $fetch<IApiResponse>(`/api/suppliers?id=${id}`, {
        method: "DELETE",
      });

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to delete supplier.",
          color: "red",
        });
        return null;
      }

      toast.add({
        title: "Success",
        description: "Supplier deleted successfully!",
        color: "green",
      });
      return response;
    } catch (error) {
      console.error("Error in deleteSupplier:", error);
      toast.add({
        title: "Error",
        description: "Failed to delete supplier.",
        color: "red",
      });
      throw error;
    }
  };

  return {
    suppliers,
    supplierFormState,
    getAllSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  };
}
