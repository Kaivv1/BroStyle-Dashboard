import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <div className="row-span-full flex flex-col gap-8 border-r-[0.1rem] border-r-gray-200 p-8 dark:border-r-gray-700 dark:bg-gray-800">
      <Logo />
      <MainNav />
    </div>
  );
}

export default Sidebar;
