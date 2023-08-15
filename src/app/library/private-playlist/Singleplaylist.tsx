"use client";
import { EarthIcon, LockIcon } from "@/components/_icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Singleplaylist({ item }: any) {
  return (
    <Link
      className="w-full px-4 p-2 flex items-start"
      href={"/playlist/" + item?._id}
    >
      <Image
        height={562}
        width={1000}
        src={item.latestVideo.latestVideo.thumbnail}
        className="w-2/5 max-w-[300px] aspect-[16/10] rounded-lg"
        alt="thumbnail"
      />
      <div className={`m-2 w-3/5 ml-3`}>
        <p className="font-bold text-sm max-two-line">{item?.name}</p>
        <p className="text-[0.8em] mt-2 opacity-1 max-two-line mb-1">
          {item.videos} videos
        </p>
        {item.isPrivate ? <LockIcon width={20} /> : <EarthIcon width={20} />}
      </div>
    </Link>
  );
}

export default Singleplaylist;
