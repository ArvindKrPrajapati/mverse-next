import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="dark:bg-transparent bg-white p-8 ">
        <h1 className="text-7xl font-bold mb-4">404!</h1>
        <p className="text-gray-600">
          The content you are requesting is not found
        </p>
        <Link href="/">go to home</Link>
      </div>
    </div>
  );
}
