import { useState } from "react";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeSlash } from "react-icons/hi2";

export function useToggleVisibility() {
  const [visible, setVisible] = useState(false);

  const icon = (
    <span onClick={() => setVisible((prev) => !prev)}>
      {visible ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
    </span>
  );

  const inputType = visible ? "text" : "password";

  return { icon, inputType };
}
