import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";

function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-200">
      <div className="grid grid-cols-[30rem] gap-4">
        <Logo login={true} />
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
