import React from "react";

function SingleBlogPage({ params }: any) {
  return (
    <div className="m-0">
      <p>{[params.slug]}</p>
    </div>
  );
}

export default SingleBlogPage;
