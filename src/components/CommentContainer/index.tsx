"use client";
import React, { useEffect, useState } from "react";
import { CloseIcon } from "../_icons";
import GenerateUserPicture from "../GenerateUserPicture";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AddComment from "@/app/play/[id]/AddComment";

export default function CommentContainer({ id }: any) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const closeModal = () => {
    setOpen(false);
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.delete("modal");
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.replace(`${pathname}${query}`);
  };

  const openModal = () => {
    router.push("?modal=comment");
    setOpen(true);
  };

  useEffect(() => {
    const modal = searchParams.get("modal");
    if (modal == "comment") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [searchParams]);

  return (
    <>
      <div className="p-4 xl:hidden">
        <p className="text-sm">comments</p>
        <div className="flex gap-2 items-center my-2">
          <div className="w-[30px]">
            <GenerateUserPicture user={{ name: "Arvind" }} />
          </div>
          <p className="text-xs max-two-line" onClick={openModal}>
            hello this is awsome comment by anyone hello this is awsome comment
            by anyone hello this is awsome comment by anyone
          </p>
        </div>
      </div>
      {/* contemt */}
      <div
        className={`fixed w-full xl:static xl:w-1/3 h-desc-height  xl:h-[80vh] xl:rounded-md right-0 bottom-0  dark:bg-neutral-950 bg-white overflow-auto transition duration-500 translate-y-0 
      ${!open ? "translate-y-[100vh] xl:translate-y-0" : ""}
      `}
        style={{
          zIndex: "30",
        }}
      >
        <div className="h-full flex flex-col justify-between">
          <header className="bg-inherit flex sticky top-0 items-center justify-between px-4 py-1 border-b-[1px] border-gray-800 xl:py-2">
            <p className="dark:text-gray-300 text-center">Comments</p>
            <button
              onClick={closeModal}
              className="p-1 border-0 hover:opacity-70 transition xl:hidden"
            >
              <CloseIcon />
            </button>
          </header>
          <section className="h-full p-3 overflow-auto">
            {/* show comment here */}
          </section>
          <footer>
            <AddComment videoId={id} />
          </footer>
        </div>
      </div>
    </>
  );
}
