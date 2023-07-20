"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ThemeIcon } from "@/components/_icons";

export default function ChangeTheme() {
  const { theme, setTheme } = useTheme();
  const [myTheme, setMyTheme] = useState<string | undefined>("System");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTheme = (t: string) => {
    setTheme(t);
    toggleDropdown();
  };

  useEffect(() => {
    setMyTheme(theme);
  }, [theme]);

  return (
    <div className="relative flex gap-3">
      <button
        onClick={toggleDropdown}
        className="px-2 py-2 capitalize  focus:outline-none"
      >
        <svg
          className={`inline-block w-10 h-10 transition-transform ${
            isOpen ? "transform rotate-180" : "transform rotate-0"
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        {myTheme}
      </button>
      {isOpen && (
        <ul className="absolute top-[50px] right-0 mt-2 w-full dark:bg-neutral-800 bg-white border dark:border-neutral-700 border-gray-300 rounded-md shadow-lg z-10">
          <li>
            <button
              onClick={() => handleTheme("system")}
              className={`flex gap-3 border-b dark:border-neutral-700 border-gray-100 w-full py-2 px-4 bg-inherit hover:dark:bg-neutral-700 hover:bg-gray-100 cursor-pointer ${
                myTheme === "system" ? "dark:bg-neutral-700 bg-gray-100" : ""
              }`}
            >
              <ThemeIcon />
              System
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTheme("dark")}
              className={`flex gap-3 border-b dark:border-neutral-700 border-gray-100 w-full py-2 px-4 bg-inherit hover:dark:bg-neutral-700 hover:bg-gray-100 cursor-pointer ${
                myTheme === "dark" ? "dark:bg-neutral-700 bg-gray-100" : ""
              }`}
            >
              <ThemeIcon type="dark" />
              Dark
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTheme("light")}
              className={`flex gap-3  w-full py-2 px-4 bg-inherit hover:dark:bg-neutral-700 hover:bg-gray-100 cursor-pointer ${
                myTheme === "light" ? "dark:bg-neutral-700 bg-gray-100" : ""
              }`}
            >
              <ThemeIcon type="light" />
              Light
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
