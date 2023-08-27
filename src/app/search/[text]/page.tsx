import React from "react";
import SearchView from "./SearchView";
import LoadMore from "@/components/LoadMore";
import Container from "@/components/Container";
import { getCurrentUser } from "@/lib/serverCookies";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  return {
    title: "Search - " + params.text.replaceAll("-", " ").trim(),
  };
}

function SearchPage({ params }: any) {
  const currentUser = getCurrentUser();
  return (
    <Container className="md:pt-5">
      <LoadMore
        loaderClassName="h-[70vh]"
        url={"/api/search?name=" + params.text.replaceAll("-", " ").trim()}
        offset={0}
      >
        <SearchView currentUser={currentUser} />
      </LoadMore>
    </Container>
  );
}

export default SearchPage;
