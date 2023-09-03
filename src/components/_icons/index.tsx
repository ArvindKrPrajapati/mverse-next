"use client";
import React from "react";

type props = {
  width?: number;
  color?: string;
};

type propsWithActive = {
  width?: number;
  color?: string;
  active?: boolean;
};

export function DislikeIcon({ width, color, active }: propsWithActive) {
  if (active) {
    return (
      <svg
        className="dark:fill-slate-50"
        width={width || "24px"}
        fill={color || "#000"}
        viewBox="0 0 24 24"
      >
        <path d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z" />
      </svg>
    );
  }

  return (
    <svg
      className="dark:fill-slate-50"
      width={width || "24px"}
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M19,15V3H23V15H19M15,3A2,2 0 0,1 17,5V15C17,15.55 16.78,16.05 16.41,16.41L9.83,23L8.77,21.94C8.5,21.67 8.33,21.3 8.33,20.88L8.36,20.57L9.31,16H3C1.89,16 1,15.1 1,14V12C1,11.74 1.05,11.5 1.14,11.27L4.16,4.22C4.46,3.5 5.17,3 6,3H15M15,5H5.97L3,12V14H11.78L10.65,19.32L15,14.97V5Z" />
    </svg>
  );
}

export function LikeIcon({ width, color, active }: propsWithActive) {
  if (active) {
    return (
      <svg
        className="dark:fill-slate-50"
        width={width || "24px"}
        fill={color || "#000"}
        viewBox="0 0 24 24"
      >
        <path d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />
      </svg>
    );
  }

  return (
    <svg
      className="dark:fill-slate-50"
      width={width || "24px"}
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z" />
    </svg>
  );
}

export function EyeIcon({ active, color, width }: propsWithActive) {
  if (active) {
    return (
      <svg stroke={color || "#000"} width={width || "24px"} viewBox="0 0 24 24">
        <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
      </svg>
    );
  }

  return (
    <svg stroke={color || "#000"} width={width || "24px"} viewBox="0 0 24 24">
      <path d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z" />
    </svg>
  );
}
export function AccountCircle({ width, color }: props) {
  return (
    <svg
      width={width || "24px"}
      fill={color || "#000"}
      className="dark:fill-slate-50"
      viewBox="0 0 24 24"
    >
      <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
    </svg>
  );
}
export function PencilIcon({ width, color }: props) {
  return (
    <svg
      width={width || "24px"}
      fill={color || "#000"}
      className="dark:fill-slate-50"
      viewBox="0 0 24 24"
    >
      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
    </svg>
  );
}

export function CloseIcon({ width, color }: props) {
  return (
    <svg
      className="dark:fill-slate-50"
      width={width || "24px"}
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
  );
}

export function AddIcon({ width, color }: props) {
  return (
    <svg
      className="dark:fill-slate-50"
      width={width || "24px"}
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
    </svg>
  );
}

export function HomeIcon({ width, color }: props) {
  return (
    <svg
      className="dark:fill-slate-50"
      width={width || "24px"}
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
    </svg>
  );
}

export function LibraryIcon({ width, color }: props) {
  return (
    <svg
      className="dark:fill-slate-50"
      width={width || "24px"}
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M4,6H2V20A2,2 0 0,0 4,22H18V20H4V6M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M10,15H8V13H10V15M10,11H8V9H10V11M10,7H8V5H10V7M20,15H18V13H20V15M20,11H18V9H20V11M20,7H18V5H20V7Z" />
    </svg>
  );
}

export function LineMenuIcon({ width, color }: props) {
  return (
    <svg
      className="dark:fill-slate-50"
      width={width || "24px"}
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </svg>
  );
}

export function MovieIcon({ width, color }: props) {
  return (
    <svg
      className="dark:fill-slate-50"
      width={width || "24px"}
      color={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z" />
    </svg>
  );
}

export function SearchIcon({ width, color }: props) {
  return (
    <svg
      className="dark:fill-slate-50"
      width={width || 24}
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    </svg>
  );
}

export function SendIcon({ color, width }: props) {
  return (
    <svg
      className="dark:fill-slate-50"
      fill={color}
      width={width || "24px"}
      viewBox="0 0 24 24"
    >
      <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
    </svg>
  );
}

export function ShareIcon({ width, color }: props) {
  return (
    <svg
      className="dark:fill-slate-50"
      fill={color || "#000"}
      width={width || "24px"}
      viewBox="0 0 24 24"
    >
      <path d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z" />
    </svg>
  );
}

export function TvIcon({ width, color }: props) {
  return (
    <svg
      className="dark:fill-slate-50"
      width={width || "24px"}
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M8.16,3L6.75,4.41L9.34,7H4C2.89,7 2,7.89 2,9V19C2,20.11 2.89,21 4,21H20C21.11,21 22,20.11 22,19V9C22,7.89 21.11,7 20,7H14.66L17.25,4.41L15.84,3L12,6.84L8.16,3M4,9H17V19H4V9M19.5,9A1,1 0 0,1 20.5,10A1,1 0 0,1 19.5,11A1,1 0 0,1 18.5,10A1,1 0 0,1 19.5,9M19.5,12A1,1 0 0,1 20.5,13A1,1 0 0,1 19.5,14A1,1 0 0,1 18.5,13A1,1 0 0,1 19.5,12Z" />
    </svg>
  );
}

export function ThemeIcon({ width, color, type }: any) {
  if (type === "light") {
    return (
      <svg
        className="dark:fill-slate-50"
        width={width || "24px"}
        fill={color || "#000"}
        viewBox="0 0 24 24"
      >
        <path d="M1 11H4V13H1V11M19.1 3.5L17 5.6L18.4 7L20.5 4.9L19.1 3.5M11 1H13V4H11V1M4.9 3.5L3.5 4.9L5.6 7L7 5.6L4.9 3.5M10 22C10 22.6 10.4 23 11 23H13C13.6 23 14 22.6 14 22V21H10V22M12 6C8.7 6 6 8.7 6 12C6 14.2 7.2 16.2 9 17.2V19C9 19.6 9.4 20 10 20H14C14.6 20 15 19.6 15 19V17.2C16.8 16.2 18 14.2 18 12C18 8.7 15.3 6 12 6M13 15.9V17H11V15.9C9.3 15.5 8 13.9 8 12C8 9.8 9.8 8 12 8S16 9.8 16 12C16 13.9 14.7 15.4 13 15.9M20 11H23V13H20V11Z" />
      </svg>
    );
  }

  if (type === "dark") {
    return (
      <svg
        className="dark:fill-slate-50"
        width={width || "24px"}
        fill={color || "#000"}
        viewBox="0 0 24 24"
      >
        <path d="M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z" />
      </svg>
    );
  }
  return (
    <svg
      className="dark:fill-slate-50"
      width={width || "24px"}
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M9 2C5.13 2 2 5.13 2 9C2 11.38 3.19 13.47 5 14.74V17C5 17.55 5.45 18 6 18H12C12.55 18 13 17.55 13 17V14.74C14.81 13.47 16 11.38 16 9C16 5.13 12.87 2 9 2M6 21C6 21.55 6.45 22 7 22H11C11.55 22 12 21.55 12 21V20H6V21M19 13H17L13.8 22H15.7L16.4 20H19.6L20.3 22H22.2L19 13M16.85 18.65L18 15L19.15 18.65H16.85Z" />
    </svg>
  );
}
export function LogoutIcon({ width, color }: props) {
  return (
    <svg width={width || "24px"} fill={color || "#000"} viewBox="0 0 24 24">
      <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
    </svg>
  );
}

export function ChevronRight({ width, color }: props) {
  return (
    <svg
      width={width || "24px"}
      fill={color || "#000"}
      className="dark:fill-slate-50"
      viewBox="0 0 24 24"
    >
      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
    </svg>
  );
}
export function SettingsIcon({ width, color }: props) {
  return (
    <svg
      width={width || "24px"}
      className="dark:fill-slate-50"
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
    </svg>
  );
}
export function DotMenuIcon({ width, color }: props) {
  return (
    <svg
      width={width || "24px"}
      className="dark:fill-slate-50"
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
    </svg>
  );
}
export function TimerIcon({ width, color }: props) {
  return (
    <svg
      width={width || "24px"}
      className="dark:fill-slate-50"
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 13.9L16.3 15.2L11 12.3V7H12.5V11.4L17 13.9Z" />
    </svg>
  );
}
export function AddMultipleIcon({ width, color }: props) {
  return (
    <svg
      width={width || "24px"}
      className="dark:fill-slate-50"
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M19,11H15V15H13V11H9V9H13V5H15V9H19M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M4,6H2V20A2,2 0 0,0 4,22H18V20H4V6Z" />
    </svg>
  );
}

export function ChevronLeft({ width, color }: props) {
  return (
    <svg
      width={width || "24px"}
      className="dark:fill-slate-50"
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>
  );
}
export function Plusicon({ width, color }: props) {
  return (
    <svg
      width={width || "24px"}
      className="dark:fill-slate-50"
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>
  );
}
export function LockIcon({ width, color }: props) {
  return (
    <svg
      width={width || "24px"}
      className="dark:fill-slate-50"
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
    </svg>
  );
}
export function EarthIcon({ width, color }: props) {
  return (
    <svg
      width={width || "24px"}
      className="dark:fill-slate-50"
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
    </svg>
  );
}
export function NewsIcon({ width, color }: props) {
  return (
    <svg
      width={width || "24px"}
      className="dark:fill-slate-50"
      fill={color || "#000"}
      viewBox="0 0 24 24"
    >
      <path d="M20 5L20 19L4 19L4 5H20M20 3H4C2.89 3 2 3.89 2 5V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V5C22 3.89 21.11 3 20 3M18 15H6V17H18V15M10 7H6V13H10V7M12 9H18V7H12V9M18 11H12V13H18V11Z" />
    </svg>
  );
}
