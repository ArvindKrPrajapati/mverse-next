import { getPinnedVideos } from "@/actions/getPinnedVideo";
import { getAllVideosByUserId } from "@/actions/getVideosByUserId";
import CardList from "@/components/CardList";
import { limit } from "@/lib/constants";
import React from "react";
type props = {
  params: {
    username: string;
  };
};
export default async function Profile({ params }: props) {
  const data = await getAllVideosByUserId(0, limit, params.username);
  const pinnedData = await getPinnedVideos(0, limit, params.username);
  const decodedUsername = decodeURIComponent(params.username);
  return (
    <main>
      {pinnedData.length ? (
        <p className="text-sm font-bold my-3">Pinned Videos</p>
      ) : null}
      <CardList data={pinnedData} />
      <CardList
        data={data}
        horizontal={true}
        loadMoreFromUrl={`/api/user/channel/${decodedUsername}/videos`}
      />
    </main>
  );
}
