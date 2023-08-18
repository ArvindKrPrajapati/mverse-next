"use client";
import Card from "@/components/Card";
import HorizontalCard from "@/components/Card/HorizontalCard";
import React, { useEffect, useState } from "react";
function SearchView({ item }: any) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 639);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="py-2 sm:p-2 w-full sm:w-1/2 lg:w-1/3 min-[1200px]:w-1/4 sm:max-w-[500px] sm:hidden">
        <Card item={item} />
      </div>
    );
  }
  return <HorizontalCard item={item} description={true} />;
}

export default SearchView;
