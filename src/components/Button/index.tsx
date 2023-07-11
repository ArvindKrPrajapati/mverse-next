import React from "react";
type props = {
  type?: any;
  disabled?: boolean;
  label: string;
  className?: string;
  onClick?: () => void;
};
export default function Button({
  type = "button",
  disabled = false,
  label,
  className,
  onClick,
}: props) {
  return (
    <button
      className={`disabled:opacity-40 bg-gradient-to-r from-indigo-500 to-purple-500 hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
