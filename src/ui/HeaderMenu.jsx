/* eslint-disable */
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/useDarkMode";
import {
  HiOutlineUser,
  HiOutlineMoon,
  HiOutlineSun,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import Loader from "./Loader";
import { useLogout } from "../features/authentication/useLogout";

function HeaderMenu() {
  const navigate = useNavigate();
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  const { logout, isLoggingOut } = useLogout();

  return (
    <ul className="flex gap-2">
      <li className="flex items-center">
        <button onClick={() => navigate("/account")} className="buttonIcon">
          <HiOutlineUser />
        </button>
      </li>
      <li className="flex items-center">
        <button onClick={() => toggleDarkMode()} className="buttonIcon">
          {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </button>
      </li>
      <li className="flex items-center">
        <button className="buttonIcon" onClick={logout}>
          {isLoggingOut ? <Loader size="md" /> : <HiArrowRightOnRectangle />}
        </button>
      </li>
    </ul>
  );
}

export default HeaderMenu;
