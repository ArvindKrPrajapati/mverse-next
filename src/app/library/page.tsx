import { getHistory } from "@/actions/getHistory";
import Card from "@/components/Card";
import Container from "@/components/Container";
import ProtectedContainer from "@/components/Container/ProtectedContainer";
import {
  ChevronRight,
  DislikeIcon,
  LikeIcon,
  LockIcon,
  TimerIcon,
} from "@/components/_icons";
import { getCurrentUser } from "@/lib/serverCookies";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Mverse | Library",
  description: "Your watch history, playlist etc",
};

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
        <div className="px-3 flex md:flex-wrap gap-3 overflow-auto mx-auto">
          {!data.length ? (
            <div className="text-center my-3">No watch history</div>
          ) : null}
          {data.map((item: any, index: number) => (
            <div
              key={index}
              className={`${
                data.length == 1
                  ? "w-full md:max-w-[450px]"
                  : "w-[180px] min-w-[180px] md:w-[21%] md:min-w-[21%] lg:w-[15%] lg:min-w-[15%]"
              }`}
            >
              <Card item={item} history={true} />
            </div>
          ))}
        </div>
        <div className="mt-3 p-5 border-t dark:border-gray-800 border-gray-200">
          <Link
            href="/library/private-playlist"
            className="flex gap-4 items-center py-3 -full"
          >
            <LockIcon />
            <p className="text-base font-bold">Private Playlist</p>
          </Link>
          <Link
            href="/library/watch-later"
            className="flex gap-4 items-center py-3 -full"
          >
            <TimerIcon />
            <p className="text-base font-bold">Watch later</p>
          </Link>
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
