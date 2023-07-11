import { getChannelByUsername } from "@/actions/getChannelByUsername";
import { formatDate } from "@/lib/common";
import { getCurrentUser } from "@/lib/serverCookies";
import React from "react";
type Props = {
  params: {
    username: string;
  };
};
export default async function AboutUser({ params }: Props) {
  const currentUser = getCurrentUser();
  // const username = decodeURIComponent(params.username)
  const data = await getChannelByUsername(params.username, currentUser?._id);

  return (
    <div className="p-3">
      <p className="font-extrabold text-base">About Channel</p>
      <p className="text-normal">{data.description}</p>
      <p className="text-normal">{data.country}</p>
      <p className="text-normal">
        Joined on{" "}
        {data.createdAt.toLocaleDateString(undefined, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
