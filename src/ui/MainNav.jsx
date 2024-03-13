import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineClipboardDocumentList,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import { IoShirtOutline } from "react-icons/io5";

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <li>
          <NavLink to="/dashboard" className="navLink">
            <HiOutlineHome className="text-xl" />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className="navLink">
            <IoShirtOutline className="text-xl" />
            <span>Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders" className="navLink">
            <HiOutlineClipboardDocumentList className="text-xl" />
            <span>Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className="navLink">
            <HiOutlineUsers className="text-xl" />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="navLink">
            <HiOutlineCog6Tooth className="text-xl" />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
