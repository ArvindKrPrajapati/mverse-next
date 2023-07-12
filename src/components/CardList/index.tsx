import React from "react";
import Card from "../Card";
type props = {
  data: any;
  horizontal?: boolean;
};
export default async function CardList({ data, horizontal = false }: props) {
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
    </>
  );
}
