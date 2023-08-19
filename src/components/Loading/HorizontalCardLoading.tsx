import React from "react";

export default function HorizontalCardLoading() {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((key) => (
        <div
          key={key}
          className="md:max-w-7xl md:px-8 lg:px-10 mx-auto p-6 flex"
        >
          <div className="animate-pulse w-2/5 max-w-[300px] dark:bg-neutral-900 bg-slate-200 aspect-video rounded-md"></div>
          <div className="ml-3 w-3/5 max-w-[500px]">
            <div className="animate-pulse w-full  h-[12px] bg-slate-200  mt-1 dark:bg-neutral-900"></div>
            <div className="animate-pulse w-full h-[12px]  bg-slate-200 mt-1 dark:bg-neutral-900"></div>
            <div className="hidden md:flex gap-3 items-center mt-3">
              <div className="animate-pulse rounded-full w-[40px] aspect-square dark:bg-neutral-900 bg-slate-200"></div>
              <div className="animate-pulse w-[120px] h-[12px]  bg-slate-200 mt-1 dark:bg-neutral-900"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
