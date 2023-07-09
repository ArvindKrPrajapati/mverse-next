import React from "react";
type props = {
  type?: any;
  disabled?: boolean;
  label: string;
};
export default function Button({
  type = "button",
  disabled = false,
  label,
}: props) {
  return (
    <button
      className="disabled:opacity-40 bg-gradient-to-r from-indigo-500 to-purple-500 hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
