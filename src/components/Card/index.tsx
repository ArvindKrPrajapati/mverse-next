import { formatDate, formatTime, handleViews } from "@/lib/common";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GenerateUserPicture from "../GenerateUserPicture";
type props = {
  item: any;
};
export default function Card({ item }: props) {
  return (
    <Link href={"/play/" + item._id}>
      <div className="relative">
        <Image
          height={562}
          width={1000}
          src={item.thumbnail}
          className="sm:rounded-lg w-full aspect-[16/10] bg-slate-200 dark:bg-slate-900"
          alt="thumbnail"
        />
        <p className="bg-black text-white text-[0.6em]  rounded-sm px-1 absolute right-[6px] bottom-[6px]">
          {formatTime(item.duration)}
        </p>
      </div>
      <div className={`flex m-2`}>
        <div className="w-[35px]">
          <div className={`w-[35px] rounded-full h-[35px] bg-slate-200`}>
            <GenerateUserPicture user={item.by} />
          </div>
        </div>
        <div className="ml-3">
          <p className="font-bold text-sm max-two-line">{item.title}</p>
          <p className="text-xs">
            {handleViews(item.views || 0)} views &#x2022;{" "}
            {formatDate(item.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
}
