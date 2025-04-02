import { useToast } from "#imports";

export function useProduct() {
  const toast = useToast();

  const products = ref([]);

  const productFormState = useState("product-formstate", () => ({
    name: "",
    description: "",
    price: 0,
    images: [],
    stock: 0,
    category: "",
  }));

  const getAllProducts = async () => {
    try {
      const response = await $fetch<IApiResponse>("/api/products");
      products.value = response.data;

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to fetch products.",
          color: "red",
        });
        return null;
      }

      return response.data;
    } catch (error) {
      console.error("Error in getAllProducts:", error);
      toast.add({
        title: "Error",
        description: "Failed to fetch products.",
        color: "red",
      });
      throw error;
    }
  };

  const createProduct = async (productData: any) => {
    try {
      const response = await $fetch<IApiResponse>("/api/products", {
        method: "POST",
        body: productData,
      });

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to create product.",
          color: "red",
        });
        return null;
      }

      toast.add({
        title: "Success",
        description: "Product created successfully!",
        color: "green",
      });
      return response.data;
    } catch (error) {
      console.error("Error in createProduct:", error);
      toast.add({
        title: "Error",
        description: "Failed to create product.",
        color: "red",
      });
      throw error;
    }
  };

  const updateProduct = async (id: string, productData: any) => {
    try {
      const response = await $fetch<IApiResponse>(`/api/products?id=${id}`, {
        method: "PUT",
        body: productData,
      });

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to update product.",
          color: "red",
        });
        return null;
      }

      toast.add({
        title: "Success",
        description: "Product updated successfully!",
        color: "green",
      });
      return response.data;
    } catch (error) {
      console.error("Error in updateProduct:", error);
      toast.add({
        title: "Error",
        description: "Failed to update product.",
        color: "red",
      });
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await $fetch<IApiResponse>(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to delete product.",
          color: "red",
        });
        return null;
      }

      toast.add({
        title: "Success",
        description: "Product deleted successfully!",
        color: "green",
      });
      return response;
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      toast.add({
        title: "Error",
        description: "Failed to delete product.",
        color: "red",
      });
      throw error;
    }
  };

  return {
    products,
    productFormState,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
