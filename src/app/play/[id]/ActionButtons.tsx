"use client";
import { DislikeIcon, LikeIcon, ShareIcon } from "@/components/_icons";
import React from "react";

export default function ActionButtons() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Your shared title",
          text: "Your shared content",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    }
  };

  return (
    <div className="flex mt-4 items-center">
      <button className="flex rounded-full bg-slate-300 dark:bg-transparent h-full px-5 py-1 text-sm">
        <LikeIcon width={20} active={true} />
        <p className="ml-2">23K</p>
      </button>
      <button className="flex rounded-full bg-slate-300 dark:bg-transparent h-full px-5 py-1 text-sm ml-2">
        <DislikeIcon width={20} />
        <p className="ml-2">1K</p>
      </button>
      <button
        onClick={handleShare}
        className="flex rounded-full bg-slate-300 dark:bg-transparent h-full px-5 py-1 text-sm ml-2"
      >
        <ShareIcon width={20} />
        <p className="ml-2">share</p>
      </button>
    </div>
  );
}
