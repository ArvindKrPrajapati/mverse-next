import { getAllVideosByUserId } from "@/actions/getVideosByUserId";
import CardList from "@/components/CardList";
import { limit } from "@/lib/constants";
import React from "react";
type props = {
  params: {
    username: string;
  };
};
export default async function ChannelVideos({ params }: props) {
  const data = await getAllVideosByUserId(0, limit, params.username);
  return (
    <main>
      <CardList horizontal={true} data={data} />
    </main>
  );
}
