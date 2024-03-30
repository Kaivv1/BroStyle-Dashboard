import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../../services/authApi";
import toast from "react-hot-toast";

export function useCreateUser() {
  const { mutate: signup, isPending: isCreating } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success(
        "Account created. Please verify the new account from the provided email address.",
      );
    },
    onError: (error) => toast.error(error.message),
  });
  return { signup, isCreating };
}
