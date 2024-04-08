import { useUser } from "../features/authentication/useUser";
import { useSettings } from "../features/settings/useSettings";

function UserAvatar() {
  const { user } = useUser();
  const { settings: { display_name } = {} } = useSettings();
  const defaultUserImage = "../../public/default-user.jpg";

  return (
    <div className="flex items-center gap-2">
      <img
        src={user?.avatar ? user?.avatar : defaultUserImage}
        alt="user avatar"
        className="block aspect-square w-9 rounded-full object-cover object-center outline outline-1 outline-gray-200 dark:outline-gray-800"
      />
      <p>{display_name ? user?.full_name : user?.username}</p>
    </div>
  );
}

export default UserAvatar;
