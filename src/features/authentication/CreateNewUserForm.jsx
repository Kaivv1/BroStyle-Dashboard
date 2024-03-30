/* eslint-disable */
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Loader from "../../ui/Loader";
import { useCreateUser } from "./useCreateUser";

function CreateNewUserForm() {
  const { register, reset, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const { isCreating, signup } = useCreateUser();

  function onSubmit(data) {
    signup({ ...data });
  }

  return (
    <form
      className="space-y-6 rounded-md border-[0.1rem] border-gray-200 bg-white p-6 dark:border-gray-600 dark:bg-gray-800 dark:shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-4">
        <FormRow label="Full Name" error={errors?.full_name?.message}>
          <input type="text" className="input" {...register("full_name")} />
        </FormRow>
        <FormRow label="Username" error={errors?.username?.message}>
          <input type="text" className="input" {...register("username")} />
        </FormRow>
        <FormRow label="Email" error={errors?.email?.message}>
          <input type="email" className="input" {...register("email")} />
        </FormRow>
        <FormRow
          label="Password(at least 6 chars)"
          error={errors?.password?.message}
        >
          <input type="password" className="input" {...register("password")} />
        </FormRow>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => reset()}
          className="buttonOutlined bg-white dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button className="buttonDefault" type="submit">
          {isCreating ? (
            <>
              <span>Creating</span>
              <Loader size="sm" color="white" />
            </>
          ) : (
            <span>Create account</span>
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateNewUserForm;
