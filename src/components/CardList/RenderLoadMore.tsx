"use client";
import React from "react";
import LoadMore from "../LoadMore";
import DecideCard from "./DecideCard";

export default function RenderLoadMore({
  loadMoreFromUrl,
  horizontal,
  description,
  history,
  currentUser,
}: any) {
  return (
    <LoadMore url={loadMoreFromUrl}>
      {/* items will be automatically passed from loadmore to its child componentZ */}
      <DecideCard
        horizontal={horizontal}
        description={description}
        history={history}
        currentUser={currentUser}
      />
    </LoadMore>
  );
}
