"use client";
import GenerateUserPicture from "@/components/GenerateUserPicture";
import Modal from "@/components/Modal";
import { PencilIcon } from "@/components/_icons";
import useModal from "@/hooks/useModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ChangeDp({ user }: any) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userObj, setUserObj] = useState<any>(user);

  const { isOpen, onOpen, onClose } = useModal();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openModal = () => {
    onOpen();
    router.push("?upload=dp");
  };

  const closeModal = () => {
    onClose();
    setUserObj(user);
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.delete("upload");
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.replace(`${pathname}${query}`);
  };

  const handleImageChange = (e: any) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setSelectedImage(imageFile);
      setUserObj({ ...userObj, dp: URL.createObjectURL(imageFile) });
    }
  };

  useEffect(() => {
    const modal = searchParams.get("upload");
    if (modal == "dp") {
      onOpen();
    } else {
      onClose();
    }
  }, [searchParams]);

  let content = <></>;

  content = (
    <main className="flex flex-col justify-between h-full">
      <div className="w-[200px] mx-auto">
        <GenerateUserPicture user={userObj} className="text-7xl" />
      </div>
      <div className="flex mt-5">
        <input
          type="file"
          name="file"
          id="file"
          className="invisible w-[0px]"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label
          htmlFor="file"
          className="flex gap-3 w-full p-3 justify-center items-center hover:opacity-70"
        >
          <PencilIcon />
          Choose Dp
        </label>
        <button className="flex gap-3 w-full p-3 justify-center items-center hover:opacity-70">
          save
        </button>
      </div>
    </main>
  );
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Change Display Picture"
        body={content}
      />
      <button
        onClick={openModal}
        className="hover:opacity-70 transition w-full p-3 flex gap-3 border-b dark:border-gray-800 border-gray-200"
      >
        <PencilIcon />
        change Dp
      </button>
    </>
  );
}
