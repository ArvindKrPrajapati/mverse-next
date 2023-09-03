"use client";
import Link from "next/link";
import React from "react";
import GenerateUserPicture from "../GenerateUserPicture";
import { formatDate } from "@/lib/common";
import { ShareIcon } from "../_icons";

function findFirstImageSrc(editorValue: any) {
  // Create a temporary DOM element to parse the HTML content
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = editorValue;

  // Find the first <img> tag within the parsed HTML
  const firstImg = tempDiv.querySelector("img");

  // Get the src attribute of the first image, if it exists
  const firstImageSrc = firstImg ? firstImg.getAttribute("src") : null;

  // Clean up the temporary DOM element
  tempDiv.remove();

  return firstImageSrc;
}

function BlogCard({ item }: any) {
  const img = findFirstImageSrc(item.content);
  return (
    <div className="border-b dark:border-gray-700 border-gray-200 pb-1">
      <div className="flex justify-between items-center w-full">
        <div className={`flex gap-3 m-2 w-full`}>
          <div className="w-[35px]">
            <Link
              href={"/profile/" + item?.by.username}
              className={`w-[40px] rounded-full aspect-square bg-slate-200`}
            >
              <GenerateUserPicture user={item?.by} />
            </Link>
          </div>
          <div>
            <p className="text-sm font-medium">{item?.by.channelName}</p>
            <p className="text-xs">{formatDate(item?.createdAt)}</p>
          </div>
        </div>
        {/* menu */}
        <ShareIcon />
      </div>
      <Link href={"/blogs/" + item.slug} className="p-4">
        <p className="text-lg font-bold max-two-line capitalize">
          {item.slug.replace(/-/g, " ").replace(/\s\S*$/, "")}
        </p>
        {img ? (
          <img className="w-full my-2 rounded-md" src={img} alt="img" />
        ) : null}
      </Link>

      {/* <div
        dangerouslySetInnerHTML={{ __html: item.content }}
        className="prose"
      />
      <br />
      <br /> */}
    </div>
  );
}

export default BlogCard;
