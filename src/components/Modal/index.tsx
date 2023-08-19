"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CloseIcon } from "../_icons";
import Link from "next/link";
import { SettingIcon } from "../MversePlayer/icons";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  body?: React.ReactElement;
  disabled?: boolean;
  title: string;
  showSettings?: boolean;
  isMenu?: boolean;
  backdropClose?: boolean;
  showHeader?: boolean;
  isSearch?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  body,
  disabled,
  title,
  isMenu = false,
  showSettings = false,
  backdropClose = false,
  showHeader = true,
  isSearch = false,
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
    <div
      onClick={backdropClose ? handleClose : () => {}}
      style={{ zIndex: "2000" }}
      className={`justify-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none  ${
        isMenu ? "items-end bg-neutral-800/10" : ""
      } ${isSearch ? "items-center md:items-start md:mt-7" : ""}
      ${!isSearch && !isMenu ? "items-center bg-neutral-800/70" : ""}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5  mx-auto lg:h-auto md:h-auto
        ${isMenu ? "h-auto max-h-[90%] my-0 p-2 overflow-auto" : "h-full"}
        ${isSearch ? "md:my-6" : ""}
        `}
      >
        <div
          className={`transalate duration-300 h-full ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-[100vh] opacity-0"
          }`}
        >
          <div
            className={`dark:bg-neutral-900 translate h-full lg:h-auto md:h-auto border-0 md:rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ${
              isMenu ? "h-auto rounded-md" : ""
            }`}
          >
            {showHeader ? (
              <div
                className={`flex item-center p-6 md:rounded-t justify-center relative border-b-[1px] dark:border-slate-800`}
              >
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <CloseIcon />
                </button>
                <div className="text-lg font-semibold">{title}</div>
                {showSettings ? (
                  <Link href="/settings" className="absolute right-9">
                    <SettingIcon />
                  </Link>
                ) : null}
              </div>
            ) : null}
            <div
              className={`relative flex-auto ${
                isMenu ? "p-2" : showHeader ? "p-6" : "p-0"
              }
              ${isSearch ? "md:max-h-[400px] overflow-auto" : ""}
              `}
            >
              {body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
