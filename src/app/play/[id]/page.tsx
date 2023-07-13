import { getVideoById } from "@/actions/getVideoById";
import MversePlayer from "@/components/MversePlayer";
import { formatDate, handleViews } from "@/lib/common";
import React from "react";
import ChannelDesc from "./ChannelDesc";
import { getChannelByUsername } from "@/actions/getChannelByUsername";
import { getCurrentUser } from "@/lib/serverCookies";
import ActionButtons from "./ActionButtons";
import CardList from "@/components/CardList";
import { getAllVideosByUserId } from "@/actions/getVideosByUserId";
import { limit } from "@/lib/constants";
type Props = {
  params: {
    id: string;
  };
};
export default async function PlayPage({ params }: Props) {
  const currentUser = getCurrentUser();
  const data = await getVideoById(params.id);
  const channelData = await getChannelByUsername(
    data.by.username,
    currentUser?._id
  );

  const videoData = await getAllVideosByUserId(0, limit, data.by.username);
  return (
    <div className="xl:p-8 fixed md:relative w-full h-full top-0 z-30 dark:bg-slate-800 overflow-auto">
      <div className="xl:flex gap-5">
        <div className="xl:w-2/3">
          <div className="md:hidden w-full aspect-video"></div>
          <div className="fixed z-20 md:static w-full top-0">
            <MversePlayer url={data.link} title={data.title} />
          </div>
          <div className="p-4 xl:px-0  md:mt-0">
            <p className="xl:text-xl text-sm max-two-line">{data.title}</p>
            <p className="dark:text-gray-300 xl:text-base text-xs">
              {handleViews(200000)} views {formatDate(data.createdAt)}
            </p>
            <p className="xl:text-sm text-xs my-1  dark:text-gray-300 max-two-line">
              {data.description}
            </p>
            <ChannelDesc
              user={{
                name: channelData.name,
                dp: channelData.dp,
                channelName: channelData.channelName,
              }}
              channelName={channelData.channelName}
              subscribers={channelData.subscribers}
              isSubscribed={channelData.isSubscribed}
              username={channelData.username}
            />
            <ActionButtons />
          </div>
        </div>
        <div className="w-1/3 hidden xl:block"></div>
      </div>
      <hr className="h-[1px] border-none bg-gray-500" />
      <CardList data={videoData} />
    </div>
  );
}
