import { getAllBlogs } from "@/actions/getAllblogs";
import BlogList from "@/components/Blogs";
import Container from "@/components/Container";
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
    </Container>
  );
}

export default BlogsPage;
