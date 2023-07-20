"use client";
import React from "react";
import GenerateUserPicture from "../GenerateUserPicture";
type Props = {
  id: string;
  user: any;
  content: string;
};
export default function SingleComment({ id, user, content }: Props) {
  return (
    <div className="px-5">
      <div className="flex p-3 items-start">
        <div className="w-[30px]">
          <GenerateUserPicture user={user} />
        </div>
        <div className="px-2 w-full">
          <p className="text-sm ml-2 whitespace-pre-wrap">{content}</p>
        </div>
      </div>
      <hr className="h-[1px] border-none dark:bg-neutral-900 bg-gray-200" />
    </div>
  );
}
