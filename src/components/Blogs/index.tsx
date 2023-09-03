"use client";
import React from "react";
import BlogCard from "./BlogCard";
import ClientOnly from "../ClientOnly";

function BlogList({ data }: any) {
  return (
    <div className="mx-auto px-2 md:w-2/3">
      {data.map((item: any, index: number) => (
        <div key={index}>
          <ClientOnly>
            <BlogCard item={item} />
          </ClientOnly>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
