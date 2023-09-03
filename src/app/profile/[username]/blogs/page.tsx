import { getChannelBlogs } from "@/actions/getChannelBlogs";
import BlogList from "@/components/Blogs";
import BlogCard from "@/components/Blogs/BlogCard";
import ClientOnly from "@/components/ClientOnly";
import LoadMore from "@/components/LoadMore";
import React from "react";

async function MyBlogs({ params }: any) {
  const data = await getChannelBlogs(params.username);
  const decodedUsername = decodeURIComponent(params.username);

  return (
    <main className="pt-2">
      <BlogList
        data={data.map((item) => ({
          ...item,
          _id: item._id.toString(),
          by: { ...item.by, _id: item.by._id.toString() },
        }))}
      />
      <ClientOnly>
        <LoadMore url={"/api/user/channel/" + decodedUsername + "/blogs"}>
          <BlogCard />
        </LoadMore>
      </ClientOnly>
    </main>
  );
}

export default MyBlogs;
