import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder as updateOrderApi } from "../../services/ordersApi";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useUpdateOrder() {
  const { orderId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: updateOrder, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, updatedOrder }) =>
      updateOrderApi(id, { ...updatedOrder }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      toast.success("Status updated");
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateOrder, isUpdating };
}
