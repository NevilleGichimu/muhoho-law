import { useToast } from "#imports";

export function useMemo() {
  const toast = useToast();

  const memos = ref([]);

  const memoFormState = useState("memo-formstate", () => ({
    name: "",
    description: "",
    price: 0,
    images: [],
    stock: 0,
    category: "",
  }));

  const getAllMemos = async () => {
    try {
      const response = await $fetch<IApiResponse>("/api/memos");
      memos.value = response.data;

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to fetch memos.",
          color: "red",
        });
        return null;
      }

      return response.data;
    } catch (error) {
      console.error("Error in getAllMemos:", error);
      toast.add({
        title: "Error",
        description: "Failed to fetch memos.",
        color: "red",
      });
      throw error;
    }
  };

  const createMemo = async (memoData: any) => {
    try {
      const response = await $fetch<IApiResponse>("/api/memos", {
        method: "POST",
        body: memoData,
      });

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to create memo.",
          color: "red",
        });
        return null;
      }

      toast.add({
        title: "Success",
        description: "Memo created successfully!",
        color: "green",
      });
      return response.data;
    } catch (error) {
      console.error("Error in createMemo:", error);
      toast.add({
        title: "Error",
        description: "Failed to create memo.",
        color: "red",
      });
      throw error;
    }
  };

  const updateMemo = async (id: string, memoData: any) => {
    try {
      const response = await $fetch<IApiResponse>(`/api/memos?id=${id}`, {
        method: "PUT",
        body: memoData,
      });

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to update memo.",
          color: "red",
        });
        return null;
      }

      toast.add({
        title: "Success",
        description: "Memo updated successfully!",
        color: "green",
      });
      return response.data;
    } catch (error) {
      console.error("Error in updateMemo:", error);
      toast.add({
        title: "Error",
        description: "Failed to update memo.",
        color: "red",
      });
      throw error;
    }
  };

  const deleteMemo = async (id: string) => {
    try {
      const response = await $fetch<IApiResponse>(`/api/memos?id=${id}`, {
        method: "DELETE",
      });

      if (!response.success) {
        toast.add({
          title: "Error",
          description: response.message || "Failed to delete memo.",
          color: "red",
        });
        return null;
      }

      toast.add({
        title: "Success",
        description: "Memo deleted successfully!",
        color: "green",
      });
      return response;
    } catch (error) {
      console.error("Error in deleteMemo:", error);
      toast.add({
        title: "Error",
        description: "Failed to delete memo.",
        color: "red",
      });
      throw error;
    }
  };

  return {
    memos,
    memoFormState,
    getAllMemos,
    createMemo,
    updateMemo,
    deleteMemo,
  };
}
