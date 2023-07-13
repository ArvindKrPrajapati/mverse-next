import { formatDate, formatTime, handleViews } from "@/lib/common";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GenerateUserPicture from "../GenerateUserPicture";
type Props = {
  item: any;
};
export default function HorizontalCard({ item }: Props) {
  return (
    <Link
      className="w-full px-6 p-2 flex items-start"
      href={"/play/" + item._id}
    >
      <div className="relative">
        <Image
          height={562}
          width={1000}
          src={item.thumbnail}
          className="w-full aspect-[16/10] rounded-lg"
          alt="thumbnail"
        />
        <p className="bg-black text-white text-[0.6em]  rounded-sm px-1 absolute right-[6px] bottom-[6px]">
          {formatTime(item.duration)}
        </p>
      </div>
      <div className={`flex m-2 w-full`}>
        <div className="ml-3">
          <p className="font-bold text-sm max-two-line">{item.title}</p>
          <div className="flex items-center my-1">
            <div className={`w-[25px] mr-2 rounded-full h-[25px] bg-slate-200`}>
              <GenerateUserPicture user={item.by} />
            </div>
            <p className="text-xs font-medium">{item.by.channelName}</p>
          </div>
          <p className="text-xs">
            {handleViews(item.views || 0)} views &#x2022;{" "}
            {formatDate(item.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}
