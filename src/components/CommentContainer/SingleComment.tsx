"use client";
import React, { useState } from "react";
import GenerateUserPicture from "../GenerateUserPicture";
import { DislikeIcon, LikeIcon } from "../_icons";
import { handleViews } from "@/lib/common";
import { mversePost } from "@/lib/apiCalls";
import toast from "react-hot-toast";

const btnClass =
  "w-full hover:outline-none p-[6px] rounded-md active:dark:bg-neutral-800 active:bg-gray-200 flex gap-1 items-center transition disabled:opacity-50";

export default function SingleComment({ item }: any) {
  const [localLikes, setLocalLikes] = useState<number>(item.likes);
  const [localDislikes, setLocalDislikes] = useState<number>(item.dislikes);
  const [localReaction, setLocalReaction] = useState<string>(item.reaction);
  const [loading, setLoading] = useState(false);

  const handleReaction = async (type: string) => {
    //  if (!currentUser?._id) {
    //    toast.error("login first");
    //    router.push("?user=login");
    //    return;
    //  }
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
      const res = await mversePost("/api/video/comment/react", {
        type,
        commentId: item._id,
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
    <div className="px-5 w-full">
      <div className="flex p-3 items-start">
        <div className="w-[30px]">
          <GenerateUserPicture user={item.author} />
        </div>
        <div className="px-2 w-full ml-2">
          <p className="text-xs  dark:text-neutral-400 text-gray-700">
            {item.author.channelName || item.author.name}
          </p>
          <p className="text-sm whitespace-pre-wrap">{item.content}</p>
          <div className="my-1 flex gap-4">
            <div className="flex gap-1 text-xs">
              <button
                onClick={() => {
                  handleReaction("like");
                }}
                disabled={loading}
                className={btnClass}
              >
                <LikeIcon
                  active={localReaction == "like" ? true : false}
                  width={12}
                />
                {localLikes ? handleViews(localLikes) : null}
              </button>
            </div>
            <div className="flex gap-1 text-xs">
              <button
                onClick={() => {
                  handleReaction("dislike");
                }}
                disabled={loading}
                className={btnClass}
              >
                <DislikeIcon
                  active={localReaction == "dislike" ? true : false}
                  width={12}
                />
                {localDislikes ? handleViews(localDislikes) : null}
              </button>
            </div>
            {/* <div className="flex gap-1 text-xs">
              <button className={btnClass}>
                <p> Reply</p>({handleViews(2000)})
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
