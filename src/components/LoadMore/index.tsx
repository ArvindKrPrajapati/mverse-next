"use client";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { limit } from "@/lib/constants";
import { mverseGet } from "@/lib/apiCalls";
import InfiniteScroll from "./InfiniteScroll";
import HorizontalCard from "../Card/HorizontalCard";
import Card from "../Card";
import Spinner from "../Loading/Spinner";

export default function LoadMore({ url, children }: any) {
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
      console.log("my error :", error);

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
