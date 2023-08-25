"use client";

import { useEffect, useState } from "react";

const StickyContainer = () => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const parentElement = document.getElementById("scroll");
    if (parentElement) {
      if (parentElement.scrollTop >= (75 * window.innerWidth) / 100) {
        // 56vw in pixels
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
  };

  useEffect(() => {
    const parentElement = document.getElementById("scroll");
    if (parentElement) {
      parentElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (parentElement) {
        parentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return (
    <div
      className={`fixed w-full z-10 p-2 bg-neutral-950 md:hidden shadow transition-all ${
        isSticky ? " top-[56vw] opacity-100" : "-top-[100%] opacity-0"
      }`}
    >
      <button className="focus:outline-none h-full rounded-lg dark:bg-neutral-700 bg-gray-200 p-2 px-3">
        All
      </button>
    </div>
  );
};

export default StickyContainer;
