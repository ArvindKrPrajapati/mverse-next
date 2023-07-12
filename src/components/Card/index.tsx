import { formatDate, formatTime, handleViews } from "@/lib/common";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GenerateUserPicture from "../GenerateUserPicture";
type props = {
  item: any;
  horizontal?: boolean;
};
export default function Card({ item, horizontal = false }: props) {
  return (
    <Link
      href={"/play/" + item._id}
      className={`${horizontal ? "md:flex" : ""}`}
    >
      <div className="relative">
        <Image
          height={562}
          width={1000}
          src={item.thumbnail}
          className="sm:rounded-lg w-full bg-slate-200 dark:bg-slate-900"
          alt="thumbnail"
          style={horizontal ? { minWidth: "300px" } : {}}
        />
        <p className="bg-black text-white text-[0.6em]  rounded-sm px-1 absolute right-[6px] bottom-[6px]">
          {formatTime(item.duration)}
        </p>
      </div>
      <div className={`flex m-2 ${horizontal ? "md:block" : ""}`}>
        <div
          className={`w-[35px] rounded-full h-[35px] bg-slate-200 ${
            horizontal ? "md:hidden" : "block"
          }`}
        >
          <GenerateUserPicture user={item.by} />
        </div>
        <div className="ml-3">
          <p className="font-bold text-normal max-two-line">{item.title}</p>
          <div className={`${horizontal ? "md:flex" : ""}`}>
            <div
              className={`w-[25px] hidden rounded-full h-[25px] bg-slate-200 ${
                horizontal ? "md:block mr-2" : ""
              }`}
            >
              <GenerateUserPicture user={item.by} />
            </div>
            <p className="text-sm font-medium">{item.by.channelName}</p>
          </div>
          <p className="text-sm">
            {handleViews(item.views || 0)} views &#x2022;{" "}
            {formatDate(item.createdAt)}
          </p>
          {horizontal ? (
            <div className="hidden md:block">
              <p className="text-[0.8em] mt-2 opacity-1 max-two-line">
                {item.description}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
