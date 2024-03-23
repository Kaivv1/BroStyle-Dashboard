import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteOrder as deleteOrderApi } from "../../services/ordersApi";

export function useDeleteOrder(id) {
  const queryClient = useQueryClient();

  const { mutate: deleteOrder, isPending: isDeleting } = useMutation({
    mutationFn: deleteOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(`Order #${id < 10 && "0"}${id} deleted`);
    },
    onError: (error) => toast.error(error.message),
  });

  return { deleteOrder, isDeleting };
}
