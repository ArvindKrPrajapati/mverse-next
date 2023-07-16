import React from "react";
import Container from "../Container";
import RenderLoadMore from "./RenderLoadMore";
import DecideCard from "./DecideCard";
type props = {
  data: any;
  horizontal?: boolean;
  description?: boolean;
  loadMoreFromUrl?: string;
};
export default async function CardList({
  data,
  horizontal,
  description = false,
  loadMoreFromUrl,
}: props) {
  return (
    <Container className="px-0 lg:px-6">
      <div className={`flex flex-wrap`}>
        {data.map((item: any, index: number) => (
          <DecideCard
            horizontal={horizontal}
            description={description}
            item={item}
            key={index}
          />
        ))}
        {loadMoreFromUrl && data.length ? (
          <RenderLoadMore
            loadMoreFromUrl={loadMoreFromUrl}
            horizontal={horizontal}
            description={description}
          />
        ) : null}
      </div>
    </Container>
  );
}
