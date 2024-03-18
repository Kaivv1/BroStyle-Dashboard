import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct as editProductApi } from "../../services/productsApi";
import toast from "react-hot-toast";

export function useEditProduct() {
  const queryClient = useQueryClient();

  const { mutate: editProduct, isPending: isEditing } = useMutation({
    mutationFn: ({ editedProduct, id }) => editProductApi(editedProduct, id),
    onSuccess: () => {
      toast.success("Product edited");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { editProduct, isEditing };
}
