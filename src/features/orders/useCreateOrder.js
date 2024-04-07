import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "../../services/ordersApi";
import toast from "react-hot-toast";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const { mutate: createOrder, isPending: isCreating } = useMutation({
    mutationFn: createOrderApi,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success("Order created");
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  return { createOrder, isCreating };
}
