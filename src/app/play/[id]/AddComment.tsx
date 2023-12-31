"use client";
import { SendIcon } from "@/components/_icons";
import { mversePost } from "@/lib/apiCalls";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddComment({
  videoId,
  fetchComments,
  currentUser,
}: any) {
  const [commentValue, setCommentValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentValue) return;
    if (!currentUser?._id) {
      toast.error("login first!");
      return;
    }
    try {
      setLoading(true);
      const res = await mversePost("/api/video/comment", {
        content: commentValue,
        videoId,
      });
      if (res.success) {
        fetchComments();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
      setCommentValue("");
    }
  };
  const handleTextareaKeyDown = (event: any) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleCommentSubmit(event);
    }
  };
  return (
    <div className="h-[60px] dark:bg-neutral-700 bg-gray-200">
      <form className="h-full flex" onSubmit={handleCommentSubmit}>
        <textarea
          value={commentValue}
          placeholder="write comment..."
          onKeyDown={handleTextareaKeyDown}
          onChange={(e) => {
            setCommentValue(e.target.value);
          }}
          className="p-3 outline-none h-full w-full text-sm resize-none dark:bg-neutral-700 dark:text-gray-200 bg-gray-200"
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="h-full p-2 disabled:opacity-70"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
