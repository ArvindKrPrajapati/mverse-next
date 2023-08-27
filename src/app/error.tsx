"use client"; // Error components must be Client Components

import { Metadata } from "next";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Error",
  description: "An error occured",
};

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="dark:bg-transparent bg-white p-8 ">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-gray-600">
          {error.message
            ? error.message
            : "Something went wrong. Please try again later."}
        </p>
        <button className="mt-2" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </div>
    // <div>
    //   <h2>Something went wrong!</h2>

    // </div>
  );
}
