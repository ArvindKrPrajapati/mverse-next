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
      className={`w-[100px]  transition-all duration-100 text-center uppercase p-1 py-2 text-sm md:text-xs ${
        pathname === route ? "border-b-2 " : ""
      }`}
      href={route}
    >
      {name}
    </Link>
  );
}
