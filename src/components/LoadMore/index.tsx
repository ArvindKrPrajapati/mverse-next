"use client";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { limit } from "@/lib/constants";
import { mverseGet } from "@/lib/apiCalls";
import InfiniteScroll from "./InfiniteScroll";
import Spinner from "../Loading/Spinner";

export default function LoadMore({ offset = limit, url, children }: any) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [allFetched, setAllFetched] = useState(false);
  const [skip, setSkip] = useState(offset);
  const loadMore = useCallback(async () => {
    const _url = url.includes("?")
      ? url + "&skip=" + skip
      : url + "?skip=" + skip;
    try {
      setLoading(true);
      const res = await mverseGet(_url);
      if (res.success) {
        setData((prev: any) => [...prev, ...res.data]);
        setSkip((prev: any) => prev + limit);
        if (res.data.length < limit) {
          setAllFetched(true);
          return;
        }
      } else {
        setAllFetched(true);
        toast.error(res.error);
      }
      // const res
    } catch (error) {
      setAllFetched(true);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  }, [skip]);

  return (
    <>
      {/* <CardList data={data} /> */}
      <div className={`flex flex-wrap`}>
        {data.map((item: any, index: number) => (
          <React.Fragment key={index}>
            {React.cloneElement(children, { item })}
          </React.Fragment>
        ))}
      </div>
      <br />
      {!allFetched ? (
        <>
          {loading ? (
            <div className="w-full flex justify-center py-3">
              <Spinner />
            </div>
          ) : (
            <InfiniteScroll onIntersect={loadMore} />
          )}
        </>
      ) : null}
    </>
  );
}
