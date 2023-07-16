"use client";
import React from "react";
import LoadMore from "../LoadMore";
import DecideCard from "./DecideCard";

export default function RenderLoadMore({
  loadMoreFromUrl,
  horizontal,
  description,
}: any) {
  return (
    <LoadMore url={loadMoreFromUrl}>
      <ChildComponent horizontal={horizontal} description={description} />
    </LoadMore>
  );
}
const ChildComponent = ({ item, horizontal, description }: any) => (
  <DecideCard horizontal={horizontal} description={description} item={item} />
);
