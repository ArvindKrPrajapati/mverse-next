import { getPlaylists } from "@/actions/getPlaylists";
import Singleplaylist from "@/app/library/private-playlist/Singleplaylist";
import Container from "@/components/Container";
import LoadMore from "@/components/LoadMore";
import { getCurrentUser } from "@/lib/serverCookies";
import React from "react";
type Props = {
  params: {
    username: string;
  };
};
export default async function UserPlayList({ params }: Props) {
  let data: any = await getPlaylists(params.username, "public");
  const username = decodeURIComponent(params.username);

  let url: string = "/api/user/channel/" + username + "/playlist";

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-[20vh] w-full">
        No data
      </div>
    );
  }
  return (
    <Container className="px-0 lg:px-6">
      {data.map((item: any, index: number) => (
        <Singleplaylist
          key={index}
          item={{
            _id: item._id.toString(),
            latestVideo: {
              latestVideo: {
                thumbnail: item.latestVideo.latestVideo.thumbnail,
              },
            },
            name: item.name,
            videos: item.videos,
            isPrivate: item.isPrivate,
          }}
        />
      ))}
      <LoadMore url={url}>
        <Singleplaylist />
      </LoadMore>
    </Container>
  );
}
