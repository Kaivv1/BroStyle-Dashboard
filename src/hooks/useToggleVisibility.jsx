import { useState } from "react";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeSlash } from "react-icons/hi2";

export function useToggleVisibility() {
  const [visibleOne, setVisibleOne] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);

  const iconOne = (
    <span onClick={() => setVisibleOne((prev) => !prev)}>
      {visibleOne ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
    </span>
  );
  const iconTwo = (
    <span onClick={() => setVisibleTwo((prev) => !prev)}>
      {visibleTwo ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
    </span>
  );

  const inputTypeOne = visibleOne ? "text" : "password";
  const inputTypeTwo = visibleTwo ? "text" : "password";

  return { iconOne, inputTypeOne, iconTwo, inputTypeTwo };
}
