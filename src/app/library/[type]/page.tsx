import { getHistory } from "@/actions/getHistory";
import { getReactedVideos } from "@/actions/getReactedvideos";
import { getWatchLater } from "@/actions/getWatchLater";
import CardList from "@/components/CardList";
import Container from "@/components/Container";
import ProtectedContainer from "@/components/Container/ProtectedContainer";
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
      <Container>
        <div className="p-4">
          <p className="font-bold capitalize pb-2  border-b dark:border-gray-800 border-gray-200">
            {params.type}
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
