"use client";
import Button from "@/components/Button";
import GenerateUserPicture from "@/components/GenerateUserPicture";
import SubscribeButton from "@/components/SubscribeButton";
import { handleViews } from "@/lib/common";
import Link from "next/link";
import React from "react";
type Props = {
  user: any;
  channelName: string;
  subscribers: number;
  isSubscribed: boolean;
  username: string;
  className?: string;
  currentUser?: any;
};
export default function ChannelDesc({
  user,
  channelName,
  subscribers,
  isSubscribed,
  username,
  className,
  currentUser,
}: Props) {
  return (
    <div
      className={`flex items-center justify-between md:justify-normal ${className}`}
    >
      <section className="flex items-center">
        <Link href={"/profile/" + username} className="w-[35px] my-2">
          <GenerateUserPicture user={user} />
        </Link>
        <div className="mx-3">
          <p className="text-sm ">{channelName}</p>
          <p className="text-xs dark:text-gray-300 ">
            {handleViews(subscribers)} subscribers
          </p>
        </div>
      </section>
      <div>
        <SubscribeButton
          username={username}
          isSubscribed={isSubscribed}
          currentUser={currentUser}
          className="text-xs"
        />
      </div>
    </div>
  );
}
