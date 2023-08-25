import { getVideoById } from "@/actions/getVideoById";
import { formatDate, handleViews } from "@/lib/common";
import React from "react";
import ChannelDesc from "./ChannelDesc";
import { getChannelByUsername } from "@/actions/getChannelByUsername";
import { getCurrentUser } from "@/lib/serverCookies";
import ActionButtons from "./ActionButtons";
import CardList from "@/components/CardList";
import { getAllVideosByUserId } from "@/actions/getVideosByUserId";
import { limit } from "@/lib/constants";
import DescriptionModal from "@/components/DescriptionModal";
import CommentContainer from "@/components/CommentContainer";
import { notFound } from "next/navigation";
import AddView from "./AddView";
import StickyContainer from "@/components/StickyTopContent";
type Props = {
  params: {
    id: string;
  };
};
export default async function PlayPage({ params }: Props) {
  const currentUser = getCurrentUser();
  const data = await getVideoById(params.id);

  const channelData = await getChannelByUsername(
    data?.by.username,
    currentUser?._id
  );

  const videoData = await getAllVideosByUserId(0, limit, data?.by.username);
  const decodedUsername = decodeURIComponent(data?.by.username);
  if (!data || !channelData || !videoData) {
    notFound();
  }
  return (
    <div
      className="xl:p-8 fixed md:relative w-full h-full top-0 z-30 dark:bg-neutral-800 overflow-auto"
      id="scroll"
    >
      <div className="xl:flex gap-5">
        <div className="xl:w-2/3">
          <div className="md:hidden w-full aspect-video"></div>
          <div className="fixed z-20 md:static w-full top-0">
            <AddView url={data?.link} title={data?.title} videoId={params.id} />
          </div>

          <div className="p-4 xl:px-0  md:mt-0">
            <p className="xl:text-xl text-sm max-two-line">{data?.title}</p>
            <p className="dark:text-gray-300 xl:text-base text-xs">
              {handleViews(data.views || 0)} views {formatDate(data?.createdAt)}
            </p>
            <DescriptionModal description={data?.description} />
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
              currentUser={currentUser}
            />
            <ActionButtons
              currentUser={currentUser}
              videoId={params.id}
              likes={data?.likes}
              dislikes={data?.dislikes}
              reaction={data?.raection}
            />
          </div>
        </div>
        <CommentContainer id={params.id} currentUser={currentUser} />
      </div>
      <StickyContainer />

      <CardList
        data={videoData}
        loadMoreFromUrl={`/api/user/channel/${decodedUsername}/videos`}
      />
    </div>
  );
}
