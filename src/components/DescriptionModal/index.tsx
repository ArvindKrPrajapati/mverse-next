"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CloseIcon } from "../_icons";
type Props = {
  description: string;
};
export default function DescriptionModal({ description }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  const openModal = () => {
    const modal = searchParams.get("modal");
    if (modal === "desc") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const closeModal = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.delete("modal");
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.replace(`${pathname}${query}`);
  };

  useEffect(() => {
    openModal();
  }, [searchParams]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed w-full xl:w-1/4 h-desc-height  xl:h-full xl:top-[50px] bottom-0 right-0 dark:bg-neutral-950 bg-white overflow-auto"
      style={{
        zIndex: "1000",
      }}
    >
      <div className="dark:bg-neutral-950 translate h-full lg:h-auto md:h-auto border-0 md:rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <header className="bg-inherit flex sticky top-0 items-center justify-between px-4 py-1 border-b-[1px] border-gray-600">
          <p className="dark:text-gray-300 text-center">Description</p>
          <button
            onClick={closeModal}
            className="p-1 border-0 hover:opacity-70 transition"
          >
            <CloseIcon />
          </button>
        </header>
        <div className="p-3 text-sm whitespace-pre-wrap">{description}</div>
      </div>
    </div>
  );
}
