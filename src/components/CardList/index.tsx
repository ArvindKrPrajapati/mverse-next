import React from "react";
import Card from "../Card";
import Container from "../Container";
type props = {
  data: any;
};
export default async function CardList({ data }: props) {
  return (
    <Container className="px-0 lg:px-6">
      <div className={`flex flex-wrap`}>
        {data.map((item: any, index: number) => {
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
    </Container>
  );
}
