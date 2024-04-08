import HeaderMenu from "./HeaderMenu";
import UserAvatar from "./UserAvatar";

function Header() {
  return (
    <header className="flex items-center justify-end gap-6 border-b-[0.1rem] border-b-gray-200 px-3 py-2 xl:px-6 xl:py-3 dark:border-b-gray-700 dark:bg-gray-800">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}
export default Header;
