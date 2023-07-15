"use client";
import { DislikeIcon, LikeIcon, ShareIcon } from "@/components/_icons";
import { mversePost } from "@/lib/apiCalls";
import { handleViews } from "@/lib/common";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
type Props = {
  currentUserId: string;
  videoId: string;
  likes?: number;
  dislikes?: number;
  reaction?: string;
};
export default function ActionButtons({
  currentUserId,
  videoId,
  likes = 0,
  dislikes = 0,
  reaction,
}: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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

  const handleReaction = async (type: string) => {
    if (!currentUserId) {
      toast.error("login first");
      router.push("?user=login");
      return;
    }
    try {
      setLoading(true);
      const res = await mversePost("/api/video/reaction", {
        type,
        videoId,
      });
      if (res.success) {
        toast.success(res.data.message);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log("reacting error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex mt-4 items-center">
      <button
        onClick={() => {
          handleReaction("like");
        }}
        disabled={loading}
        className="flex rounded-full bg-slate-200 dark:bg-transparent h-full px-5 py-1 text-sm border-0  transition disabled:opacity-50"
      >
        <LikeIcon width={18} active={reaction == "like" ? true : false} />
        {likes ? <p className="ml-2">{handleViews(likes)}</p> : null}
      </button>
      <button
        onClick={() => {
          handleReaction("dislike");
        }}
        disabled={loading}
        className="flex rounded-full bg-slate-300 dark:bg-transparent h-full px-5 py-1 text-sm ml-2 border-0  transition disabled:opacity-50"
      >
        <DislikeIcon width={18} active={reaction == "dislike" ? true : false} />
        {dislikes ? <p className="ml-2">{handleViews(dislikes)}</p> : null}
      </button>
      <button
        onClick={handleShare}
        className="flex rounded-full bg-slate-300 dark:bg-transparent h-full px-5 py-1 text-sm ml-2 border-0 hover:opacity-70 transition disabled:opacity-50"
      >
        <ShareIcon width={20} />
        <p className="ml-2">share</p>
      </button>
    </div>
  );
}
