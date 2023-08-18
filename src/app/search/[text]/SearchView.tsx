"use client";
import Card from "@/components/Card";
import HorizontalCard from "@/components/Card/HorizontalCard";
import useViewPort from "@/hooks/useViewPort";
function SearchView({ item, currentUser }: any) {
  const { isMobile } = useViewPort();

  if (isMobile) {
    return (
      <div className="py-2 sm:p-2 w-full sm:w-1/2 lg:w-1/3 min-[1200px]:w-1/4 sm:max-w-[500px] sm:hidden">
        <Card currentUser={currentUser} item={item} />
      </div>
    );
  }
  return (
    <HorizontalCard currentUser={currentUser} item={item} description={true} />
  );
}

export default SearchView;
