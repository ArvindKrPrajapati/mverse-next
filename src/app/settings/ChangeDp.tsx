"use client";
import GenerateUserPicture from "@/components/GenerateUserPicture";
import Modal from "@/components/Modal";
import { PencilIcon } from "@/components/_icons";
import useModal from "@/hooks/useModal";
import { uploadImage } from "@/lib/apiCalls";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ChangeDp({ user }: any) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userObj, setUserObj] = useState<any>(user);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { isOpen, onOpen, onClose, disabled, toggleDisabled } = useModal();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openModal = () => {
    setUserObj(user);
    onOpen();
    router.push("?upload=dp");
  };

  const closeModal = () => {
    onClose();
    setSelectedImage(null);
    setUploadProgress(0);
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

  const handleSave = async () => {
    if (!selectedImage) {
      toast.error("select an image");
      return;
    }
    try {
      setUploadProgress(0);
      toggleDisabled();
      const data = await uploadImage(selectedImage, "dp", (progress) => {
        setUploadProgress(progress);
      });
      if (data.success) {
        closeModal();
        router.refresh();
        toast.success("image uploaded successfully");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      toast.error("something went wrong");
    } finally {
      toggleDisabled();
      setUploadProgress(0);
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
        {!disabled ? (
          <>
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
              Choose image
            </label>
          </>
        ) : null}
        {selectedImage ? (
          <button
            onClick={handleSave}
            disabled={disabled}
            className="flex gap-3 w-full p-3 justify-center items-center hover:opacity-70"
          >
            {!disabled ? "save" : uploadProgress + " %"}
          </button>
        ) : null}
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
        disabled={disabled}
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
