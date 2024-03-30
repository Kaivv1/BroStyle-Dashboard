/* eslint-disable */
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import { useLogin } from "./useLogin";
import Loader from "../../ui/Loader";
import { useToggleVisibility } from "../../hooks/useToggleVisibility";

function LoginForm() {
  const { register, handleSubmit, formState } = useForm();
  const { login, isLogging } = useLogin();
  const { errors } = formState;
  const { icon, inputType } = useToggleVisibility();

  function onSubmit(data) {
    login(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-md border-[0.1rem] border-gray-200 bg-white p-8 px-8 py-10 dark:border-gray-700 dark:bg-gray-800 dark:shadow-md"
    >
      <Heading as="h4">Log in to your account</Heading>
      <FormRow label="Email" error={errors?.email?.message}>
        <input
          type="email"
          className="input"
          id="email"
          {...register("email", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Password" error={errors?.password?.message}>
        <div className="relative flex items-center" id="password">
          <input
            type={inputType}
            className="input w-full"
            {...register("password", {
              required: "This field is required",
            })}
          />
          <span className="absolute right-3 cursor-pointer text-xl">
            {icon}
          </span>
        </div>
      </FormRow>
      <button
        type="submit"
        className="buttonDefault flex items-center justify-center"
        disabled={isLogging}
      >
        {isLogging ? (
          <>
            <span>Logging in</span>
            <Loader size="sm" color="white" />
          </>
        ) : (
          <span>Login</span>
        )}
      </button>
    </form>
  );
}

export default LoginForm;
