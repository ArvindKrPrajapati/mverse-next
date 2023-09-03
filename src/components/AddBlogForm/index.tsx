"use client";

import React, { useState } from "react";
import Editor from "../Editor";
import Button from "../Button";
import useModal from "@/hooks/useModal";
import Modal from "../Modal";
import Input from "../Input";
import toast from "react-hot-toast";
import { mversePost } from "@/lib/apiCalls";

function AddBlogForm() {
  const [value, setValue] = useState("");
  const [Slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const { isOpen, onClose, onOpen } = useModal();
  const handleClose = () => {
    setValue("");
    setSlug("");
    onClose();
  };
  const handleClick = async () => {
    if (!Slug || !value) {
      toast.error("Invalid form");
    }
    try {
      setLoading(true);
      const res = await mversePost("/api/blogs", {
        slug: Slug,
        content: value,
      });
      if (res.success) {
        toast.success("Blog added!");
        handleClose();
      } else {
        toast.error(res.error);
      }
    } catch (error: any) {
      toast.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div>
      <Input
        type="text"
        label="Title (for url)*"
        value={Slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <Editor
        value={value}
        onChange={setValue}
        className="h-[49vh] mb-[90px]"
      />
      <Button
        label={loading ? "Posting....." : "Post"}
        disabled={loading}
        onClick={handleClick}
      />
    </div>
  );

  return (
    <>
      <Button label="Add Blog" onClick={onOpen} />
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        body={content}
        title="Add Blog"
        disabled={loading}
        wider={true}
      />
    </>
  );
}

export default AddBlogForm;
