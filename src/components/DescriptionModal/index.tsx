"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ChevronRight, CloseIcon } from "../_icons";
type Props = {
  description: string;
};
export default function DescriptionModal({ description }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  const openModal = () => {
    router.push("?modal=desc");
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.delete("modal");
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.replace(`${pathname}${query}`);
  };

  useEffect(() => {
    const modal = searchParams.get("modal");
    if (modal == "desc") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [searchParams]);

  return (
    <>
      <div className="flex items-center">
        <p className="xl:text-sm text-xs my-1  dark:text-gray-300 max-two-line">
          {description}
        </p>
        <button
          onClick={openModal}
          className="p-2 hover:opacity-70 focus:outline-none"
        >
          <ChevronRight width={30} />
        </button>
      </div>
      <div
        className={`fixed w-full xl:w-1/4 h-desc-height  xl:h-full xl:top-[50px] bottom-0 right-0 dark:bg-neutral-950 bg-gray-100 overflow-auto transition duration-500 translate-y-0 xl:translate-x-0
         ${
           !open
             ? "translate-y-[100vh] xl:translate-y-0 xl:translate-x-[100%]"
             : ""
         }
        `}
        style={{
          zIndex: "1000",
        }}
      >
        <div className="translate h-full lg:h-auto md:h-auto border-0 md:rounded-md relative flex flex-col w-full bg-inherit outline-none focus:outline-none">
          <header className="bg-inherit flex sticky top-0 items-center justify-between px-4 py-1 border-b-[1px] dark:border-gray-600 border-gray-200">
            <p className="dark:text-gray-300 text-center">Description</p>
            <button
              onClick={closeModal}
              className="p-1 border-0 hover:opacity-70 transition"
            >
              <CloseIcon />
            </button>
          </header>
          <div className="p-3 text-sm whitespace-pre-wrap h-full">
            {description}
          </div>
        </div>
      </div>
    </>
  );
}
