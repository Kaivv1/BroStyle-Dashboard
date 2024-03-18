import { useState } from "react";

export function useToggleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);

  const toggleOpenModal = () => setIsOpen((isOpen) => !isOpen);

  const toggleOpenSecondModal = () => setIsOpenSecond((isOpen) => !isOpen);

  return { isOpen, isOpenSecond, toggleOpenModal, toggleOpenSecondModal };
}
