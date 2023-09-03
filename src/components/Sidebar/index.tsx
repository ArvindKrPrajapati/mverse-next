"use client";
import Link from "next/link";
import React from "react";
import { AddIcon, HomeIcon, LibraryIcon, NewsIcon } from "../_icons";
import { usePathname } from "next/navigation";

type props = {
  isMenuOpen: boolean;
};
export default function Sidebar({ isMenuOpen }: props) {
  const pathname = usePathname();

  // sidebar
  const options = [
    {
      name: "Home",
      icon: <HomeIcon />,
      href: "/",
    },
    {
      name: "Blogs",
      icon: <NewsIcon />,
      href: "/blogs",
    },

    {
      name: "Upload",
      icon: <AddIcon />,
      href: "/upload",
    },

    {
      name: "Library",
      icon: <LibraryIcon />,
      href: "/library",
    },
  ];
  // ends

  return (
    <div
      className={`w-[75px] lg:w-[230px] fixed left-0 z-10  transition duration-1000 
      ${pathname.startsWith("/play/") ? "hidden md:block" : ""}
      `}
      style={!isMenuOpen ? { width: "75px" } : {}}
    >
      <div className="md:h-screen md:p-3 flex md:block md:relative fixed bottom-0 w-full justify-between dark:bg-neutral-900 bg-white transition duration-300">
        {options.map((item, index) => {
          return (
            <Link
              href={item.href}
              key={index}
              className={`w-full block lg:flex items-center md:hover:dark:bg-neutral-600 md:hover:bg-gray-400 px-3 py-2 md:rounded-lg transition duration-300 ${
                pathname === item.href
                  ? "md:bg-gray-400 md:dark:bg-neutral-600"
                  : ""
              }`}
              style={!isMenuOpen ? { display: "block" } : {}}
            >
              <div className="flex justify-center">{item.icon}</div>
              <p
                className={`lg:text-base md:my-1 lg:my-0 text-[0.6em] text-center font-medium lg:ml-3 transition duration-300 ${
                  pathname === item.href
                    ? "text-gray-500 md:dark:text-gray-200 md:text-black"
                    : ""
                }`}
                style={
                  !isMenuOpen ? { fontSize: "0.6em", marginLeft: "0" } : {}
                }
              >
                {item.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
