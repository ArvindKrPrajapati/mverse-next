import { getPlaylistVideos } from "@/actions/getplaylistVideos";
import CardList from "@/components/CardList";
import Container from "@/components/Container";
import { EarthIcon, LockIcon } from "@/components/_icons";
import { getCurrentUser } from "@/lib/serverCookies";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const currentUser = getCurrentUser();
  const data = await getPlaylistVideos(params.id, currentUser?._id);
  if (!data) {
    return {
      title: "Not found",
    };
  }

  return {
    title: data.playlist.name || "Playlist",
  };
}
async function PlaylistPage({ params }: Props) {
  const currentUser = getCurrentUser();
  const data = await getPlaylistVideos(params.id, currentUser?._id);
  const url = "/api/user/playlist/" + params.id;
  if (!data.data.length) {
    return (
      <div className="flex items-center justify-center h-[70vh] w-full">
        No data
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full mb-4 text-gray-300">
        <div
          className="absolute inset-0 bg-cover bg-center blur-lg"
          style={{ backgroundImage: `url(${data.data[0].thumbnail})` }}
        ></div>

        <div className="relative z-10 p-4 h-full md:flex items-center gap-10 ">
          <img
            className="w-full md:w-64 rounded-lg mb-2 md:mb-0 my-auto"
            src={data.data[0].thumbnail}
            alt="Image"
          />
          <div>
            <h1 className="text-lg font-semibold text-white">
              {data.playlist.name}
            </h1>
            <h1 className="text-md">
              by{" "}
              {data.playlist.createdBy.channelName ||
                data.playlist.createdBy.name}
            </h1>
            <div className="flex gap-3 text-xs">
              <div>{data.total} videos</div>
              <div>
                {data.playlist.isPrivate ? (
                  <div className="flex gap-1 items-center">
                    <LockIcon width={15} color="#eee" />
                    Private
                  </div>
                ) : (
                  <div className="flex gap-1 items-center">
                    <EarthIcon width={15} color="#eee" />
                    Public
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <CardList
          horizontal={true}
          data={data.data}
          loadMoreFromUrl={url}
          history={true}
        />
      </Container>
    </>
  );
}

export default PlaylistPage;
