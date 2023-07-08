"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CloseIcon } from "../_icons";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  body?: React.ReactElement;
  disabled?: boolean;
  title: string;
};

export default function Modal({
  isOpen,
  onClose,
  body,
  disabled,
  title,
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5  my-6 mx-auto h-full lg:h-auto md:h-auto">
        <div
          className={`transalate duration-300 h-full ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-[100vh] opacity-0"
          }}`}
        >
          <div className="dark:bg-slate-900 translate h-full lg:h-auto md:h-auto border-0 md:rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex item-center p-6 md:rounded-t justify-center relative border-b-[1px] dark:border-slate-800">
              <button
                onClick={handleClose}
                className="p-1 border-0 hover:opacity-70 transition absolute left-9"
              >
                <CloseIcon />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            <div className="relative p-6 flex-auto">{body}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
