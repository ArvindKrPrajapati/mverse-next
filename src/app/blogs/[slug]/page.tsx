import { getBlogBySlug } from "@/actions/getBlogBySlug";
import Container from "@/components/Container";
import GenerateUserPicture from "@/components/GenerateUserPicture";
import { SearchIcon } from "@/components/_icons";
import { notFound } from "next/navigation";
import React from "react";

async function SingleBlogPage({ params }: any) {
  const data = await getBlogBySlug(params.slug);
  if (!data) {
    notFound();
  }

  return (
    <main>
      {/* header */}
      <header className="dark:bg-neutral-900/80 backdrop-blur-xl  border-b dark:border-gray-700 border-gray-200 px-2 md:px-4 sticky top-0">
        <main className="flex gap-2 items-center justify-between h-[60px] mx-auto max-w-[100rem]">
          <div className="flex gap-3 items-center">
            <div className="h-[40px] w-[40px]">
              <GenerateUserPicture user={data.by} className="rounded-sm" />
            </div>
            <p className="text-xl font-bold">{data.by.channelName}</p>
          </div>
          <div>
            <SearchIcon />
          </div>
        </main>
      </header>
      {/* container */}

      <main className="md:flex gap-2 w-full p-4">
        <section className="md:w-[22%]"></section>
        {/* content */}
        <section className="md:w-[50%]">
          <div
            dangerouslySetInnerHTML={{ __html: data.content }}
            className="prose text-white"
            style={{ color: "white !important" }}
          />
        </section>
        {/* right side */}
        <section className="md:w-[28%]"></section>
      </main>
    </main>
  );
}

export default SingleBlogPage;
