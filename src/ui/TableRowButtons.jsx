/* eslint-disable */
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { useClickOutside } from "../hooks/useClickOutside";
import { useState } from "react";

function TableRowButtons({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        className="buttonIcon text-gray-900 dark:text-gray-300"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <HiOutlineEllipsisVertical />
      </button>
      {isOpen && (
        <div
          className={`absolute -left-1 top-10 z-50 flex flex-col gap-2 rounded-md bg-gray-100 p-1 shadow-md dark:bg-gray-900`}
          onClick={() => setIsOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default TableRowButtons;
