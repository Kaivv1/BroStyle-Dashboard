import { useEffect, useRef } from "react";

export function useClickOutside(onClose) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          onClose();
        }
      }

      document.addEventListener("click", handleClickOutside, true);

      return () =>
        document.removeEventListener("click", handleClickOutside, true);
    },
    [onClose],
  );
  return ref;
}
