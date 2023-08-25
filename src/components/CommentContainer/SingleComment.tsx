"use client";
import React from "react";
import GenerateUserPicture from "../GenerateUserPicture";
import { DislikeIcon, LikeIcon } from "../_icons";
import { handleViews } from "@/lib/common";
type Props = {
  id: string;
  user: any;
  content: string;
};
const btnClass =
  "w-full hover:outline-none p-[6px] rounded-md active:dark:bg-neutral-800 active:bg-gray-200 flex gap-1 items-center transition";

export default function SingleComment({ item }: any) {
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
              <button className={btnClass}>
                <LikeIcon width={12} />
                {handleViews(2000)}
              </button>
            </div>
            <div className="flex gap-1 text-xs">
              <button className={btnClass}>
                <DislikeIcon width={12} />
                {handleViews(2000)}
              </button>
            </div>
            <div className="flex gap-1 text-xs">
              <button className={btnClass}>
                <p> Reply</p>({handleViews(2000)})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
