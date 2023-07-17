import { formatDate, formatTime, handleViews } from "@/lib/common";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GenerateUserPicture from "../GenerateUserPicture";
import ClientOnly from "../ClientOnly";
type props = {
  item: any;
};
export default function Card({ item }: props) {
  return (
    <Link href={"/play/" + item._id} className="active:bg-transparent">
      <div className="relative">
        <Image
          height={562}
          width={1000}
          src={item.thumbnail}
          className="sm:rounded-lg w-full aspect-[16/10] bg-slate-200 dark:bg-neutral-950"
          alt="thumbnail"
        />
        <p className="bg-black text-white text-[0.6em]  rounded-sm px-1 absolute right-[6px] bottom-[6px]">
          {formatTime(item.duration)}
        </p>
      </div>
      <div className={`flex m-2`}>
        <div className="w-[40px]">
          <ClientOnly>
            <Link
              href={"/profile/" + item.by.username}
              className={`w-[40px] rounded-full aspect-square bg-slate-200`}
            >
              <GenerateUserPicture user={item.by} />
            </Link>
          </ClientOnly>
        </div>
        <div className="ml-3 w-full">
          <p className="font-bold text-sm max-two-line">{item.title}</p>
          <div className="flex md:block flex-wra">
            <p className="text-xs font-medium">{item.by.channelName} &nbsp;</p>
            <p className="text-xs">
              {handleViews(item.views || 0)} views &#x2022;{" "}
              {formatDate(item.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
