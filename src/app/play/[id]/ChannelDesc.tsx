"use client";
import Button from "@/components/Button";
import GenerateUserPicture from "@/components/GenerateUserPicture";
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
};
export default function ChannelDesc({
  user,
  channelName,
  subscribers,
  isSubscribed,
  username,
  className,
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
        <Button
          label={isSubscribed ? "unsubscribe" : "subscribe"}
          className="rounded-full text-xs"
        />
      </div>
    </div>
  );
}
