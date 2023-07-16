import React from "react";
import Card from "../Card";
import Container from "../Container";
import HorizontalCard from "../Card/HorizontalCard";
import LoadMore from "../LoadMore";
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
        {loadMoreFromUrl && data.length ? (
          <LoadMore
            url={loadMoreFromUrl}
            horizontal={horizontal}
            description={description}
          />
        ) : null}
      </div>
    </Container>
  );
}
