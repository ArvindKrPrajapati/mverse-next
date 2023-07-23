import React from "react";
import Container from "../Container";
import RenderLoadMore from "./RenderLoadMore";
import DecideCard from "./DecideCard";
type props = {
  data: any;
  horizontal?: boolean;
  description?: boolean;
  loadMoreFromUrl?: string;
  history?: boolean;
};
export default async function CardList({
  data,
  horizontal,
  description = false,
  loadMoreFromUrl,
  history = false,
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
            history={history}
          />
        ))}
        {loadMoreFromUrl && data.length ? (
          <RenderLoadMore
            loadMoreFromUrl={loadMoreFromUrl}
            horizontal={horizontal}
            description={description}
            history={history}
          />
        ) : null}
      </div>
    </Container>
  );
}
