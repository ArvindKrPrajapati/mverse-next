"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
type Props = {
  name: string;
  route: string;
};
export default function TabHeader({ route, name }: Props) {
  const pathname = usePathname();

  return (
    <Link
      className={`px-7 transition-all duration-100 text-center uppercase p-1 py-2 text-sm md:text-xs ${
        pathname === route
          ? "border-b-2 border-gray-700 dark:border-gray-100"
          : ""
      }`}
      href={route}
    >
      {name}
    </Link>
  );
}
