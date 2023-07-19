import React from "react";
import HomeLoading from "./HomeLoading";

export default function PlayLoading() {
  return (
    <div className="xl:p-8 fixed md:relative w-full h-full overflow-hidden top-0 z-30 dark:bg-neutral-900">
      <div className="xl:flex gap-5">
        <div className="xl:w-2/3">
          <div className="w-full aspect-video animate-pulse dark:bg-neutral-800 bg-slate-200"></div>

          <div className="p-4 xl:px-0  md:mt-0">
            <div className="animate-pulse w-full  h-[12px] bg-slate-200  mt-1 dark:bg-neutral-800"></div>
            <div className="animate-pulse w-[80%]  h-[12px] bg-slate-200  mt-2 dark:bg-neutral-800"></div>

            <div className="flex items-center xl:justify-between gap-3">
              <div className="flex items-center gap-3 my-4">
                <div className="rounded-full animate-pulse w-[40px] aspect-square dark:bg-neutral-800 bg-slate-200"></div>
                <div>
                  <div className="animate-pulse w-[100px]  h-[12px] bg-slate-200  mt-1 dark:bg-neutral-800"></div>
                  <div className="animate-pulse w-[70px]  h-[12px] bg-slate-200  mt-1 dark:bg-neutral-800"></div>
                </div>
              </div>
              <div className="rounded-full w-[120px] h-[40px] animate-pulse dark:bg-neutral-800 bg-slate-200"></div>
            </div>
          </div>
        </div>
        <div className="hidden xl:block w-1/3 h-[80vh] animate-pulse dark:bg-neutral-800 bg-slate-200"></div>
      </div>
      <HomeLoading />
    </div>
  );
}
