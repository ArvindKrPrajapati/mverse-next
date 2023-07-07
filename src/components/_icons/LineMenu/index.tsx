"use client";

import React from "react";
type props = {
  width?: number;
  color?: string;
};
function LineMenuIcon({ width, color }: props) {
  return (
    <svg width={width || "24px"} fill={color || "#000"} viewBox="0 0 24 24">
      <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </svg>
  );
}

export default LineMenuIcon;
