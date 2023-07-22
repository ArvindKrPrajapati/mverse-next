import { formatDate, formatTime, handleViews } from "@/lib/common";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GenerateUserPicture from "../GenerateUserPicture";
type props = {
  item: any;
  history?: boolean;
};
export default function Card({ item, history = false }: props) {
  return (
    <>
      <Link href={"/play/" + item?._id} className="relative">
        <Image
          height={562}
          width={1000}
          src={item?.thumbnail}
          className={`sm:rounded-lg w-full aspect-[16/10] bg-slate-200 dark:bg-neutral-950 ${
            history ? "rounded-lg" : ""
          }`}
          alt="thumbnail"
        />
        <p className="bg-black text-white text-[0.6em]  rounded-sm px-1 absolute right-[6px] bottom-[6px]">
          {formatTime(item?.duration)}
        </p>
      </Link>
      <div className={`flex m-2`}>
        {!history ? (
          <div className="w-[40px]">
            <Link
              href={"/profile/" + item?.by.username}
              className={`w-[40px] rounded-full aspect-square bg-slate-200`}
            >
              <GenerateUserPicture user={item?.by} />
            </Link>
          </div>
        ) : null}
        <Link
          href={"/play/" + item?._id}
          className={`${!history ? "ml-3" : ""} w-full}`}
        >
          <p className="font-bold text-sm max-two-line">{item?.title}</p>
          <div className="flex md:block flex-wrap">
            <p className="text-xs font-medium">{item?.by.channelName} &nbsp;</p>
            {!history ? (
              <p className="text-xs">
                {handleViews(item?.views || 0)} views &#x2022;{" "}
                {formatDate(item?.createdAt)}
              </p>
            ) : null}
          </div>
        </Link>
      </div>
    </>
  );
}
