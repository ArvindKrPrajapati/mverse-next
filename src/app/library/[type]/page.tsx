import { getHistory } from "@/actions/getHistory";
import { getReactedVideos } from "@/actions/getReactedvideos";
import { getWatchLater } from "@/actions/getWatchLater";
import CardList from "@/components/CardList";
import Container from "@/components/Container";
import ProtectedContainer from "@/components/Container/ProtectedContainer";
import { LockIcon } from "@/components/_icons";
import { getCurrentUser } from "@/lib/serverCookies";
import React from "react";

export default async function ShowList({ params }: any) {
  const currentUser = getCurrentUser();
  let data: any = [];
  let url: string = "";
  if (params.type === "history") {
    data = await getHistory(currentUser?._id);
    url = "/api/library/history";
  } else if (params.type === "liked") {
    data = await getReactedVideos(currentUser?._id, "like");
    url = "/api/library/reacted/like";
  } else if (params.type === "disliked") {
    data = await getReactedVideos(currentUser?._id, "dislike");
    url = "/api/library/reacted/dislike";
  } else if ("watch-later") {
    data = await getWatchLater(currentUser?._id);
    url = "/api/library/watch-later";
  }

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
      <div className="relative w-full mb-2 text-gray-300">
        <div
          className="absolute inset-0 bg-cover bg-center blur-lg"
          style={{ backgroundImage: `url(${data[0].thumbnail})` }}
        ></div>

        <div className="relative z-10 p-4 h-full md:flex items-center gap-10 ">
          <img
            className="w-full md:w-64 rounded-lg mb-2 md:mb-0 my-auto"
            src={data[0].thumbnail}
            alt="Image"
          />
          <div>
            <h1 className="text-lg font-semibold text-white">{params.type}</h1>
            <div className="flex gap-3 text-xs">
              <div>
                <div className="flex gap-1 items-center font-bold capitalize">
                  <LockIcon width={15} color="#eee" />
                  Private
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <div className="p-4">
          <p className="font-bold capitalize pb-2  border-b dark:border-gray-800 border-gray-200">
            {/* {params.type} */}
          </p>
        </div>
        <CardList
          horizontal={true}
          data={data}
          loadMoreFromUrl={url}
          history={true}
        />
      </Container>
    </ProtectedContainer>
  );
}
