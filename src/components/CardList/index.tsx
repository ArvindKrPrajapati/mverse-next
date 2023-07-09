import React from "react";
import Card from "../Card";
import { mverseGet } from "@/lib/apiCalls";
type props = {
  url: string;
  horizontal?: boolean;
};
export default async function CardList({ url, horizontal = false }: props) {
  const res = await mverseGet(url);
  let data = [];
  if (res.success) {
    data = res.data.map((item: any) => ({
      id: item.tmdb_id,
      title: item.title,
      image: item.backdrop_path,
      duration: 2200,
      views: 2100,
      description: item.overview,
      createdAt: item.createdAt,
      user: {
        name: item.video[0].source,
        dp: "https://wallpapercave.com/wp/wp6120167.jpg",
      },
    }));
  }

  return (
    <>
      <div
        className={`flex flex-wrap justify-center ${
          horizontal ? "md:block" : ""
        }`}
      >
        {data.map((item: any, index: number) => {
          if (horizontal) {
            return (
              <div
                key={index}
                className="py-2 sm:p-2 w-full sm:w-1/2 md:w-full"
              >
                <Card item={item} horizontal={horizontal} />
              </div>
            );
          }
          return (
            <div
              key={index}
              className="py-2 sm:p-2 w-full sm:w-1/2 lg:w-1/3 min-[1200px]:w-1/4 sm:max-w-[500px]"
            >
              <Card item={item} horizontal={horizontal} />
            </div>
          );
        })}
      </div>
      {/* <div className="h-[80px]"></div> */}
    </>
  );
}
