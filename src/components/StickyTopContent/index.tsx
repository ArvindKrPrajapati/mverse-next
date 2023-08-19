"use client";

const StickyContainer = () => {
  return (
    <div className="sticky top-[56vw] z-10 p-2 bg-neutral-950 md:hidden shadow">
      <button className="focus:outline-none h-full rounded-lg dark:bg-neutral-700 bg-gray-200 p-2 px-3">
        All
      </button>
    </div>
  );
};

export default StickyContainer;
