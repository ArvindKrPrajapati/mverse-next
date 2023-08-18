import React from "react";
import SearchView from "./SearchView";
import LoadMore from "@/components/LoadMore";
import Container from "@/components/Container";

function SearchPage({ params }: any) {
  return (
    <Container className="md:pt-5">
      <LoadMore url={"/api/search?name=" + params.text.replaceAll("-"," ").trim()} offset={0}>
        <SearchView />
      </LoadMore>
    </Container>
  );
}

export default SearchPage;
