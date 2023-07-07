"use client";

import React from "react";
type props = {
  width?: number;
  color?: string;
};
export default function ShareIcon({ width, color }: props) {
  return (
    <svg fill={color || "#000"} width={width || "24px"} viewBox="0 0 24 24">
      <path d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z" />
    </svg>
  );
}
