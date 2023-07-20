"use client";
import React from "react";
import { useTheme } from "next-themes";
import { ThemeIcon } from "@/components/_icons";

export default function ChangeTheme() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    if (theme === "system") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("system");
    }
  };
  return (
    <button
      onClick={toggleTheme}
      className="hover:opacity-70 transition w-full p-3 flex gap-3 border-b dark:border-gray-800 border-gray-200"
    >
      <ThemeIcon
        type={theme === "light" ? "light" : theme == "dark" ? "dark" : ""}
      />
      {theme === "system"
        ? "Sytem default"
        : theme === "dark"
        ? "Dark"
        : "Light"}
    </button>
  );
}
