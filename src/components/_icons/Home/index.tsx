"use client";
import React from "react";
type props = {
  width?: number;
  color?: string;
};
function HomeIcon({ width, color }: props) {
  return (
    <svg width={width || "24px"} fill={color || "#000"} viewBox="0 0 24 24">
      <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
    </svg>
  );
}

export default HomeIcon;
