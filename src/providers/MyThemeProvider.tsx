"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

export default function MyThemeProvider({ children }: any) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
