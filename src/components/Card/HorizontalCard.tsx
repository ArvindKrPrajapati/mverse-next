import { formatDate, formatTime, handleViews } from "@/lib/common";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GenerateUserPicture from "../GenerateUserPicture";
import ClientOnly from "../ClientOnly";
import VideoMenu from "../VideoMenu/indes";
type Props = {
  item: any;
  description?: boolean;
  history?: boolean;
  currentUser?: any;
};
export default function HorizontalCard({
  item,
  description = false,
  history = false,
  currentUser = {},
}: Props) {
  return (
    <div className="flex justify-between w-full items-start">
      <Link
        className="w-full px-4 p-2 flex items-start"
        href={"/play/" + item?._id}
      >
        <div className="relative w-2/5 max-w-[300px]">
          <Image
            height={562}
            width={1000}
            src={item?.thumbnail}
            className="w-full aspect-[16/10] rounded-lg"
            alt="thumbnail"
          />
          <p className="bg-black text-white text-[0.6em]  rounded-sm px-1 absolute right-[6px] bottom-[6px]">
            {formatTime(item?.duration)}
          </p>
        </div>
        <div className={`flex m-2 w-3/5`}>
          <div className="ml-3">
            <p className="font-bold text-sm max-two-line">{item?.title}</p>
            {description ? (
              <div className="flex items-center my-1">
                <ClientOnly>
                  <Link
                    href={"/profile/" + item?.by.username}
                    className={`w-[25px] mr-2 rounded-full h-[25px] bg-slate-200`}
                  >
                    <GenerateUserPicture user={item?.by} />
                  </Link>
                </ClientOnly>
                <p className="text-xs font-medium">{item?.by.channelName}</p>
              </div>
            ) : null}
            {!history ? (
              <p className="text-xs">
                {handleViews(item?.views || 0)} views &#x2022;{" "}
                {formatDate(item?.createdAt)}
              </p>
            ) : (
              <p className="text-xs font-medium">{item?.by.channelName}</p>
            )}
            {description ? (
              <div>
                <p className="text-[0.8em] mt-2 opacity-1 max-two-line">
                  {item?.description}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </Link>
      <VideoMenu _id={item._id.toString()} currentUser={currentUser} />
    </div>
  );
}
