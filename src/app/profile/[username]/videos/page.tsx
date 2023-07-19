import { getAllVideosByUserId } from "@/actions/getVideosByUserId";
import CardList from "@/components/CardList";
import { limit } from "@/lib/constants";
import { notFound } from "next/navigation";
import React from "react";
type props = {
  params: {
    username: string;
  };
};
export default async function ChannelVideos({ params }: props) {
  const data = await getAllVideosByUserId(0, limit, params.username);
  if (!data) {
    notFound();
  }
  const decodedUsername = decodeURIComponent(params.username);

  return (
    <main>
      <CardList
        horizontal={true}
        data={data}
        loadMoreFromUrl={`/api/user/channel/${decodedUsername}/videos`}
      />
    </main>
  );
}
