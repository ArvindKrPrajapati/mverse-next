"use client";
import React, { useEffect, useRef } from "react";
type Props = {
  onIntersect: () => void;
};
export default function InfiniteScroll({ onIntersect }: Props) {
  const sentinelref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    }, options);

    if (sentinelref.current) {
      observer.observe(sentinelref.current);
    }

    return () => {
      if (sentinelref.current) {
        observer.unobserve(sentinelref.current);
      }
    };
  }, [onIntersect]);

  return <main ref={sentinelref} />;
}
