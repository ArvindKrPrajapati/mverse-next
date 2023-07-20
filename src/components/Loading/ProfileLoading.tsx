import React from "react";
import HorizontalCardLoading from "./HorizontalCardLoading";

export default function ProfileLoading() {
  return (
    <main>
      {/* cover */}
      <main className="animate-pulse flex justify-center items-center w-full aspect-[5/1] sm:aspect-[6/1] md:aspect-[7/1] xl:aspect-[8/1] dark:bg-neutral-800 bg-slate-200"></main>

      <div className="mx-auto p-7 md:flex justify-between">
        <main className="md:flex items-center">
          <div className="flex justify-center md:block">
            {/* dp */}
            <div className="animate-pulse w-1/6 min-w-[80px] aspect-square md:w-[120px] rounded-full dark:bg-neutral-800 bg-slate-200"></div>
          </div>
          <div className="md:ml-5 w-full my-3 md:m-0 flex justify-center">
            <div className="w-1/3 md:w-[270px]">
              <div className="animate-pulse w-full  h-[12px] bg-slate-200  mt-1 dark:bg-neutral-800"></div>
              <div className="animate-pulse w-full  h-[12px] bg-slate-200  mt-1 dark:bg-neutral-800"></div>
            </div>
          </div>
        </main>
        <div className="animate-pulse w-[120px] h-[35px] rounded-full mx-auto md:mx-0 dark:bg-neutral-800 bg-slate-200"></div>
      </div>
      <HorizontalCardLoading />
    </main>
  );
}
