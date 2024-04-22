/* eslint-disable */
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import { useUser } from "./useUser";
import { useUpdateUser } from "./userUpdateUser";
import Loader from "../../ui/Loader";

function UpdateUserAccountForm() {
  const { user } = useUser();
  const { isAuthenticated, ...userDataForEdit } = user;
  const { updateUser, isUpdating } = useUpdateUser();
  const { register, formState, handleSubmit, reset, getValues } = useForm({
  const { register, formState, handleSubmit, reset, getValues } = useForm({
    defaultValues: { ...userDataForEdit },
  });

  const { errors } = formState;

  function onSubmit(data) {
    let avatar;

    if (data.avatar) {
      avatar = typeof data.avatar === "string" ? data.avatar : data.avatar[0];
    }

    updateUser(
      { ...data, avatar: avatar ? avatar : null },
      { onSettled: () => reset() },
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h2">Update user data</Heading>
      <div className="space-y-4 rounded-md border-[0.1rem] border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 dark:shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <FormRow label="Avatar" error={errors?.avatar?.message}>
            <input
              type="file"
              accept="images/*"
              className="rounded-md"
              {...register("avatar")}
            />
          </FormRow>
          <FormRow label="Email" error={errors?.email?.message}>
            <input
              type="email"
              className="input"
              {...register("email")}
              disabled={isUpdating || getValues("email") === "demo@asd.com"}
            />
          </FormRow>
          <FormRow label="Full Name" error={errors?.full_name?.message}>
            <input
              type="text"
              className="input"
              {...register("full_name")}
              disabled={isUpdating}
            />
            <input
              type="text"
              className="input"
              {...register("full_name")}
              disabled={isUpdating}
            />
          </FormRow>
          <FormRow label="Username" error={errors?.username?.message}>
            <input
              type="text"
              className="input"
              {...register("username")}
              disabled={isUpdating}
            />
            <input
              type="text"
              className="input"
              {...register("username")}
              disabled={isUpdating}
            />
          </FormRow>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => reset()}
            type="button"
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
              <span>Update account</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default UpdateUserAccountForm;
