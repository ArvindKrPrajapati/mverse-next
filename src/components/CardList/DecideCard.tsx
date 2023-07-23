import React from "react";
import HorizontalCard from "../Card/HorizontalCard";
import Card from "../Card";

export default function DecideCard({
  horizontal,
  description,
  item,
  history,
}: any) {
  if (horizontal) {
    return (
      <HorizontalCard item={item} description={description} history={history} />
    );
  }
  return (
    <div className="py-2 sm:p-2 w-full sm:w-1/2 lg:w-1/3 min-[1200px]:w-1/4 sm:max-w-[500px]">
      <Card item={item} />
    </div>
  );
}
