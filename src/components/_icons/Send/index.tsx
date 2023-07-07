"use client";

import React from "react";
type props = {
  width?: number;
  color?: string;
};
export default function SendIcon({ color, width }: props) {
  return (
    <svg fill={color} width={width || "24px"} viewBox="0 0 24 24">
      <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
    </svg>
  );
}
