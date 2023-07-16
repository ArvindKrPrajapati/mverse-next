"use client";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { limit } from "@/lib/constants";
import { mverseGet } from "@/lib/apiCalls";
import InfiniteScroll from "./InfiniteScroll";
import HorizontalCard from "../Card/HorizontalCard";
import Card from "../Card";

export default function LoadMore({
  url,
  horizontal = false,
  description = false,
}: any) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [allFetched, setAllFetched] = useState(false);
  const [skip, setSkip] = useState(limit);
  const loadMore = useCallback(async () => {
    try {
      setLoading(true);
      const res = await mverseGet(url + "?skip=" + skip);
      if (res.success) {
        if (res.data.length === 0) {
          setAllFetched(true);
          return;
        }
        setData(res.data);
        setSkip((prev) => prev + limit);
      } else {
        toast.error(res.error);
      }
      // const res
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  }, [skip]);

  return (
    <>
      {/* <CardList data={data} /> */}
      <div className={`flex flex-wrap`}>
        {data.map((item: any, index: number) => {
          if (horizontal) {
            return (
              <HorizontalCard
                key={index}
                item={item}
                description={description}
              />
            );
          }
          return (
            <div
              key={index}
              className="py-2 sm:p-2 w-full sm:w-1/2 lg:w-1/3 min-[1200px]:w-1/4 sm:max-w-[500px]"
            >
              <Card item={item} />
            </div>
          );
        })}
      </div>
      {!allFetched ? (
        <>
          {loading ? "loading..." : <InfiniteScroll onIntersect={loadMore} />}
        </>
      ) : null}
    </>
  );
}
