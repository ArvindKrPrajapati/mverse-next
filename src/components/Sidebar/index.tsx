"use client";
import Link from "next/link";
import React from "react";
import { AddIcon, HomeIcon, LibraryIcon, MovieIcon, TvIcon } from "../_icons";
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
      name: "series",
      icon: <TvIcon />,
      href: "/series",
    },
    {
      name: "Upload",
      icon: <AddIcon />,
      href: "/upload",
    },
    {
      name: "Movies",
      icon: <MovieIcon />,
      href: "/movies",
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
      className="w-[75px] md:w-[230px] fixed left-0 z-10  transition duration-1000 "
      style={!isMenuOpen ? { width: "75px" } : {}}
    >
      <div className="md:h-screen md:p-3 flex md:block md:relative fixed bottom-0 w-full justify-between dark:bg-slate-900 bg-white transition duration-300">
        {options.map((item, index) => {
          return (
            <Link
              href={item.href}
              key={index}
              className={`w-full block md:flex items-center hover:bg-slate-600 px-3 py-2 md:rounded-lg transition duration-300 ${
                pathname === item.href ? "bg-slate-600" : ""
              }`}
              style={!isMenuOpen ? { display: "block" } : {}}
            >
              <div className="flex justify-center">{item.icon}</div>
              <p
                className="md:text-base text-[0.6em] text-center font-medium md:ml-3 transition duration-300"
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
