import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useClickOutside } from "../hooks/useClickOutside";

function Modal({ children, onClose }) {
  const ref = useClickOutside(onClose);

  return createPortal(
    <div
      className="absolute inset-0 flex items-center justify-center p-1 backdrop-blur-sm backdrop-brightness-75 sm:p-0
      dark:backdrop-brightness-125
    "
    >
      <div
        className="shadow-s flex w-full flex-col gap-1 rounded-md bg-white p-6 text-base sm:w-auto dark:bg-gray-800 dark:text-gray-300"
        ref={ref}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md bg-transparent p-1 text-2xl hover:bg-gray-200 dark:hover:bg-gray-900"
          >
            <HiXMark />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
