import React from "react";
import { AccountCircle } from "../_icons";
import GenerateUserPicture from "../GenerateUserPicture";
type props = {
  user: any;
};
export default function MyPic({ user }: props) {
  if (user) {
    return (
      <div className="w-[25px] h-[25px]">
        <GenerateUserPicture user={user} />
      </div>
    );
  }
  return <AccountCircle width={28} />;
}
