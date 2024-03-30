import CreateNewUserForm from "../features/authentication/CreateNewUserForm";
import Heading from "../ui/Heading";

function Users() {
  return (
    <div className="flex flex-col gap-8">
      <Heading as="h1">Create new user</Heading>
      <CreateNewUserForm />
    </div>
  );
}

export default Users;
