import { getPlaylists } from "@/actions/getPlaylists";
import Container from "@/components/Container";
import ProtectedContainer from "@/components/Container/ProtectedContainer";
import LoadMore from "@/components/LoadMore";
import { getCurrentUser } from "@/lib/serverCookies";
import React from "react";
import Singleplaylist from "./Singleplaylist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Playlist",
  description: "Your private playlists are here",
};

async function PrivatePlaylist() {
  const currentUser: any = getCurrentUser();
  let data: any = await getPlaylists(currentUser?._id, "private");
  let url: string = "/api/user/playlist?type=private";

  if (!data.length) {
    return (
      <ProtectedContainer byId={true}>
        <div className="flex items-center justify-center h-[70vh] w-full">
          No data
        </div>
      </ProtectedContainer>
    );
  }

  return (
    <ProtectedContainer byId={true}>
      <Container>
        <div className="p-4">
          <p className="font-bold capitalize pb-2  border-b dark:border-gray-800 border-gray-200">
            Private Playlists
          </p>
        </div>
        <>
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
        </>
      </Container>
    </ProtectedContainer>
  );
}

export default PrivatePlaylist;
