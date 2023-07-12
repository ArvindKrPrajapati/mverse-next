import React from "react";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`px-6 sm:px-8 lg:px-10 mx-auto ${className}`}>
      {children}
    </div>
  );
}
