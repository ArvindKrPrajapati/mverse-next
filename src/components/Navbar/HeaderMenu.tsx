import React from "react";
import { SettingIcon } from "../MversePlayer/icons";
import Link from "next/link";
import useModal from "@/hooks/useModal";
import Menu from "../Menu";

function HeaderMenu() {
  const { onClose, isOpen, onOpen } = useModal();
  const btnClass =
    "w-full flex hover:outline-none justify-start py-2 px-3 rounded-md active:dark:bg-neutral-800 active:bg-gray-200 flex gap-2 items-center transition";

  const content = (
    <div className="p-2">
      <Link href="/settings" className={`${btnClass}`} onClick={onClose}>
        <SettingIcon width={20} />
        settings
      </Link>
    </div>
  );
  return (
    <Menu onClose={onClose} isOpen={isOpen} onOpen={onOpen} content={content} />
  );
}

export default HeaderMenu;
