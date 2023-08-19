import React from "react";
import { ChevronLeft, SearchIcon } from "../_icons";
import Link from "next/link";
import Spinner from "../Loading/Spinner";

function Search({
  closeModal,
  searchQuery,
  handleChange,
  searchResult,
  searching,
  handleSubmit,
}: any) {
  return (
    <main className="dark:bg-neutral-900 bg-white">
      <div className="flex items-center px-2 h-[50px] md:hidden sticky top-0 md:z-10 bg-inherit">
        <button
          onClick={closeModal}
          className="transition focus:outline-none rounded-full p-2 dark:active:bg-neutral-800 active:bg-gray-300"
        >
          <ChevronLeft />
        </button>
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="search"
            className="w-full text-sm p-1 pl-2 bg-inherit focus:outline-none text-gray-800 dark:text-gray-100 focus:shadow-outline"
            onChange={(e) => handleChange(e.target.value)}
            value={searchQuery}
            autoFocus={true}
          />
        </form>
      </div>
      {/* content */}
      <div className="px-4 text-sm">
        {searchQuery ? (
          <Link
            replace={true}
            href={`/search/${searchQuery.trim().replaceAll(" ", "-")}`}
            className="flex w-full p-1 gap-2"
          >
            {searching ? (
              <Spinner className="w-[15px] h-[15px]" />
            ) : (
              <SearchIcon width={14} />
            )}
            {searchQuery}
          </Link>
        ) : null}
        {searchResult.map((item: any, index: number) => (
          <Link
            key={index}
            replace={true}
            href={`/search/${item.title.trim().replaceAll(" ", "-")}`}
            className="flex w-full p-[6px] gap-2"
          >
            <SearchIcon width={14} />
            {item.title}
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Search;
