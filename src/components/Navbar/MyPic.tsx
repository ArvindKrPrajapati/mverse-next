"use client";
import React from "react";
import { AccountCircle } from "../_icons";
import GenerateUserPicture from "../GenerateUserPicture";
type props = {
  user: () => void;
};
export default function MyPic({ user }: props) {
  const a: any = user();
  if (a) {
    return (
      <div className="w-[25px] h-[25px]">
        <GenerateUserPicture user={a} />
      </div>
    );
  }
  return <AccountCircle width={28} />;
}
