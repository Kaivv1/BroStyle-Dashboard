import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Loader from "../../ui/Loader";
import { useUpdateUserPassword } from "./useUpdateUserPassword";

function UpdateUserPasswordForm() {
  const { updateUserPassword, isUpdating } = useUpdateUserPassword();
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    const { password } = data;
    updateUserPassword({ password }, { onSettled: () => reset() });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h2">Update password</Heading>
      <div className="space-y-4 rounded-md border-[0.1rem] border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 dark:shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <FormRow label="New password" error={errors?.password?.message}>
            <input
              type="password"
              className="input
        "
              {...register("password")}
            />
          </FormRow>
          <FormRow
            label="Confirm password"
            error={errors?.confirmPassword?.message}
          >
            <input
              type="password"
              className="input
        "
              {...register("confirmPassword", {
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
            />
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
