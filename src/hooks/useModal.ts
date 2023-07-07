import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const toggleDisabled = () => {
    setDisabled((pre) => !pre);
  };

  return {
    isOpen,
    onOpen,
    onClose,
    disabled,
    toggleDisabled,
  };
};

export default useModal;
