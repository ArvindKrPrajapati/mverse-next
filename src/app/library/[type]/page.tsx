import { getHistory } from "@/actions/getHistory";
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
