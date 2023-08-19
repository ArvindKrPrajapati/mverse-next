import React from "react";

export default function HomeLoading() {
  return (
    <main className="h-[calc(100vh-50px)]  overflow-hidden -mt-2 md:mt-0">
      <div className="flex flex-wrap justify-center md:mt-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((key) => (
          <div className="md:mx-1 my-2" key={key}>
            <div className="animate-pulse sm:rounded-lg w-[100vw] md:w-[39vw] lg:w-[35vw] xl:max-w-[270px] aspect-[16/10] bg-slate-200 dark:bg-neutral-900"></div>
            <div className={`flex m-2`}>
              <div
                className={`animate-pulse w-[40px] aspect-square rounded-full bg-slate-200 dark:bg-neutral-900`}
              ></div>
              <div className="ml-3 w-full">
                <div className="animate-pulse w-full  h-[12px] bg-slate-200  mt-1 dark:bg-neutral-900"></div>
                <div className="animate-pulse w-full h-[12px]  bg-slate-200 mt-1 dark:bg-neutral-900"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
