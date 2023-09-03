"use client";
import React, { useState } from "react";
import Sidebar from ".";
import { LineMenuIcon } from "../_icons";
import { usePathname } from "next/navigation";
import SafeAreaView from "../SafeAreaView";

export default function SideBarContainer() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const pathname = usePathname();
  if (pathname.startsWith("/blogs/") && !pathname.endsWith("/blogs/")) {
    return null;
  }
  const toggleSideBar = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <SafeAreaView>
      <div
        className={`ml-0 md:ml-[75px] ${
          isMenuOpen ? "lg:ml-[230px]" : "lg:ml-[75px]"
        }`}
      ></div>
      <div
        className="fixed  top-[10px] px-5 hidden md:block"
        style={{ zIndex: "60" }}
        onClick={toggleSideBar}
      >
        <LineMenuIcon width={30} />
      </div>
      <Sidebar isMenuOpen={isMenuOpen} />
    </SafeAreaView>
  );
}
