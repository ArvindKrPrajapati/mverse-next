import Image from "next/image";
import React from "react";
type props = {
  user: {
    name?: string;
    dp?: string;
    channelName?: string;
  };
  className?: string;
};
export default function GenerateUserPicture({ user, className }: props) {
  if (user?.dp) {
    return (
      <Image
        src={user.dp}
        width={100}
        height={100}
        alt="dp"
        className="rounded-full w-full aspect-square"
      />
    );
  }

  if (user?.channelName || user?.name) {
    return (
      <div
        className={`w-full aspect-square rounded-full bg-indigo-400 flex justify-center items-center font-bold ${className}`}
      >
        <p style={{ fontSize: "" }}>
          {user?.channelName ? (
            <>{user.channelName[0]}</>
          ) : user?.name ? (
            <>{user.name[0]}</>
          ) : null}
        </p>
      </div>
    );
  }
  return (
    <div className="w-full h-full rounded-full dark:bg-gray-700 bg-gray-300"></div>
  );
}
