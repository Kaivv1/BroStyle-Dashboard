/* eslint-disable */
import UpdateUserAccountForm from "../features/authentication/UpdateUserAccountForm";
import UpdateUserPasswordForm from "../features/authentication/UpdateUserPasswordForm";
import Heading from "../ui/Heading";

function Account() {
  return (
    <div className="flex flex-col gap-8">
      <Heading as="h1">Update your account</Heading>
      <div className="space-y-4">
        <UpdateUserAccountForm />
        <UpdateUserPasswordForm />
      </div>
    </div>
  );
}

export default Account;
