import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Loader from "../../ui/Loader";
import { useUpdateUserPassword } from "./useUpdateUserPassword";
import { useToggleVisibility } from "../../hooks/useToggleVisibility";
import { useUser } from "./useUser";
import toast from "react-hot-toast";

function UpdateUserPasswordForm() {
  const { updateUserPassword, isUpdating } = useUpdateUserPassword();
  const { user: { email } = {} } = useUser();
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const { iconOne, iconTwo, inputTypeOne, inputTypeTwo } =
    useToggleVisibility();
  function onSubmit(data) {
    if (email === "demo@asd.com") {
      reset();
      return toast.error(
        "Changing the password of the demo acc is not allowed!",
      );
    }

    const { password } = data;
    updateUserPassword({ password }, { onSettled: () => reset() });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h2">Update password</Heading>
      <div className="space-y-4 rounded-md border-[0.1rem] border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 dark:shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <FormRow label="New password" error={errors?.password?.message}>
            <div className="relative flex items-center" id="password">
              <input
                type={inputTypeOne}
                className="input w-full"
                {...register("password", {
                  required: "This field is required",
                })}
                disabled={isUpdating}
              />
              <span className="absolute right-3 cursor-pointer text-xl">
                {iconOne}
              </span>
            </div>
          </FormRow>
          <FormRow
            label="Confirm password"
            error={errors?.confirmPassword?.message}
          >
            <div className="relative flex items-center" id="password">
              <input
                type={inputTypeTwo}
                className="input w-full"
                {...register("confirmPassword", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                disabled={isUpdating}
              />
              <span className="absolute right-3 cursor-pointer text-xl">
                {iconTwo}
              </span>
            </div>
          </FormRow>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="buttonOutlined bg-white dark:bg-gray-900 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button type="submit" className="buttonDefault">
            {isUpdating ? (
              <>
                <span>Updating</span>
                <Loader size="sm" color="white" />
              </>
            ) : (
              <span>Update password</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default UpdateUserPasswordForm;
