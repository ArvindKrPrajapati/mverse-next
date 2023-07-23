import { getHistory } from "@/actions/getHistory";
import Card from "@/components/Card";
import Container from "@/components/Container";
import ProtectedContainer from "@/components/Container/ProtectedContainer";
import { ChevronRight, DislikeIcon, LikeIcon } from "@/components/_icons";
import { getCurrentUser } from "@/lib/serverCookies";
import Link from "next/link";
import React from "react";

export default async function LibraryPage() {
  const currentUser = getCurrentUser();
  let data: any = [];
  if (currentUser?._id) {
    data = await getHistory(currentUser?._id);
  }

  return (
    <ProtectedContainer byId={true}>
      <Container>
        <main className="p-3">
          <Link
            href="/library/history"
            className="flex justify-between items-center"
          >
            <p className="text-base font-bold">History</p>
            <ChevronRight />
          </Link>
        </main>
        <div className="px-3 flex md:flex-wrap gap-3 md:gap-0 overflow-auto">
          {data.map((item: any, index: number) => (
            <div
              key={index}
              className="md:p-2 sm:w-1/3 lg:w-1/4 min-[1200px]:w-1/5 min-w-[120px]"
            >
              <Card item={item} history={true} />
            </div>
          ))}
        </div>
        <div className="mt-3 p-5 border-t dark:border-gray-800 border-gray-200">
          <Link
            href="/library/liked"
            className="flex gap-4 items-center py-3 -full"
          >
            <LikeIcon active={true} />
            <p className="text-base font-bold">Liked Videos</p>
          </Link>
          <Link
            href="/library/disliked"
            className="flex gap-4 items-center py-3 w-full"
          >
            <DislikeIcon active={true} />
            <p className="text-base font-bold">Disliked Videos</p>
          </Link>
        </div>
      </Container>
    </ProtectedContainer>
  );
}
