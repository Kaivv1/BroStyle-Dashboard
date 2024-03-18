import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct as createProductApi } from "../../services/productsApi";
import toast from "react-hot-toast";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      toast.success("Product created");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { createProduct, isCreating };
}
