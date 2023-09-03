import Spinner from "@/components/Loading/Spinner";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[70vh] w-full">
      <Spinner />
    </div>
  );
}
