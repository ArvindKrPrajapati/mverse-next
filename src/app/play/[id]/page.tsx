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
import { ChevronRight } from "@/components/_icons";
import Link from "next/link";
import DescriptionModal from "@/components/DescriptionModal";
import CommentContainer from "@/components/CommentContainer";
import { notFound } from "next/navigation";
type Props = {
  params: {
    id: string;
  };
};
export default async function PlayPage({ params }: Props) {
  const currentUser = getCurrentUser();
  const data = await getVideoById(params.id);
  if (!data) {
    notFound();
  }
  const channelData = await getChannelByUsername(
    data.by.username,
    currentUser?._id
  );

  const videoData = await getAllVideosByUserId(0, limit, data.by.username);
  const decodedUsername = decodeURIComponent(data.by.username);

  return (
    <div className="xl:p-8 fixed md:relative w-full h-full top-0 z-30 dark:bg-neutral-900 overflow-auto">
      <div className="xl:flex gap-5">
        <div className="xl:w-2/3">
          <div className="md:hidden w-full aspect-video"></div>
          <div className="fixed z-20 md:static w-full top-0">
            <MversePlayer url={data.link} title={data.title} />
          </div>
          <DescriptionModal description={data.description} />
          <div className="p-4 xl:px-0  md:mt-0">
            <p className="xl:text-xl text-sm max-two-line">{data.title}</p>
            <p className="dark:text-gray-300 xl:text-base text-xs">
              {handleViews(200000)} views {formatDate(data.createdAt)}
            </p>
            <div className="flex items-center">
              <p className="xl:text-sm text-xs my-1  dark:text-gray-300 max-two-line">
                {data.description}
              </p>
              <Link href="?modal=desc" className="p-2">
                <ChevronRight width={30} />
              </Link>
            </div>
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
              currentUserId={currentUser?._id}
              videoId={params.id}
              likes={data.likes}
              dislikes={data.dislikes}
              reaction={data.raection}
            />
          </div>
        </div>
        <CommentContainer id={params.id} />
      </div>
      <CardList
        data={videoData}
        loadMoreFromUrl={`/api/user/channel/${decodedUsername}/videos`}
      />
    </div>
  );
}
