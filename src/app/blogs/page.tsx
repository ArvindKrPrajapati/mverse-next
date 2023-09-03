import { getAllBlogs } from "@/actions/getAllblogs";
import BlogList from "@/components/Blogs";
import BlogCard from "@/components/Blogs/BlogCard";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import LoadMore from "@/components/LoadMore";
import React from "react";

async function BlogsPage() {
  const data = await getAllBlogs();

  return (
    <Container className="pt-3">
      <BlogList
        data={data.map((item) => ({
          ...item,
          _id: item._id.toString(),
          by: { ...item.by, _id: item.by._id.toString() },
        }))}
      />
      <ClientOnly>
        <LoadMore url="/api/blogs">
          <BlogCard />
        </LoadMore>
      </ClientOnly>
    </Container>
  );
}

export default BlogsPage;
