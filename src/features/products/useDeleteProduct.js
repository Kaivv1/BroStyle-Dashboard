import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "../../services/productsApi";
import toast from "react-hot-toast";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteProduct };
}
