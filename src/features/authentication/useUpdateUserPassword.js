import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserPassword as updateUserPasswordApi } from "../../services/authApi";
import toast from "react-hot-toast";

export function useUpdateUserPassword() {
  const queryClient = useQueryClient();

  const { mutate: updateUserPassword, isPending: isUpdating } = useMutation({
    mutationFn: updateUserPasswordApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Password updated");
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateUserPassword, isUpdating };
}
