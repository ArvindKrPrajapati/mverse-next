"use client";
import VideoMenu from "@/components/VideoMenu/indes";
import { DislikeIcon, LikeIcon, ShareIcon } from "@/components/_icons";
import { mversePost } from "@/lib/apiCalls";
import { handleViews, share } from "@/lib/common";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
type Props = {
  currentUser: any;
  videoId: string;
  likes?: number;
  dislikes?: number;
  reaction?: string;
};
export default function ActionButtons({
  currentUser,
  videoId,
  likes = 0,
  dislikes = 0,
  reaction,
}: Props) {
  const [localLikes, setLocalLikes] = useState(likes);
  const [localDislikes, setLocalDislikes] = useState(dislikes);
  const [localReaction, setLocalReaction] = useState(reaction);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleShare = async () => {
    await share("title", "test", window.location.href);
  };

  const handleReaction = async (type: string) => {
    if (!currentUser?._id) {
      toast.error("login first");
      router.push("?user=login");
      return;
    }
    try {
      setLoading(true);
      if (!localReaction) {
        if (type == "like") {
          setLocalLikes((p) => p + 1);
          setLocalReaction("like");
        } else {
          setLocalDislikes((p) => p + 1);
          setLocalReaction("dislike");
        }
      } else if (localReaction == "like") {
        setLocalLikes((p) => p - 1);
        if (type == "like") {
          setLocalReaction("");
        } else {
          setLocalDislikes((p) => p + 1);
          setLocalReaction("dislike");
        }
      } else if (localReaction == "dislike") {
        setLocalDislikes((p) => p - 1);
        if (type == "dislike") {
          setLocalReaction("");
        } else {
          setLocalLikes((p) => p + 1);
          setLocalReaction("like");
        }
      }
      const res = await mversePost("/api/video/reaction", {
        type,
        videoId,
      });
      if (res.success) {
        // toast.success(res.data.message);
        // router.refresh();
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
        className="flex rounded-full bg-slate-200 dark:bg-transparent h-full px-3 py-1 text-sm border-0  transition disabled:opacity-50"
      >
        <LikeIcon width={18} active={localReaction == "like" ? true : false} />
        {localLikes ? <p className="ml-2">{handleViews(localLikes)}</p> : null}
      </button>
      <button
        onClick={() => {
          handleReaction("dislike");
        }}
        disabled={loading}
        className="flex rounded-full bg-slate-300 dark:bg-transparent h-full px-3 py-1 text-sm ml-2 border-0  transition disabled:opacity-50"
      >
        <DislikeIcon
          width={18}
          active={localReaction == "dislike" ? true : false}
        />
        {localDislikes ? (
          <p className="ml-2">{handleViews(localDislikes)}</p>
        ) : null}
      </button>
      <button
        onClick={handleShare}
        className="flex rounded-full bg-slate-300 dark:bg-transparent h-full px-3 py-1 text-sm ml-2 border-0 hover:opacity-70 transition disabled:opacity-50"
      >
        <ShareIcon width={20} />
        <p className="ml-2">share</p>
      </button>
      <VideoMenu currentUser={currentUser} _id={videoId} text="save" />
    </div>
  );
}
