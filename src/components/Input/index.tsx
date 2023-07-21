"use client";
import React, { useState } from "react";
import { EyeIcon } from "../_icons";
type Props = {
  type: string;
  onChange?: (e: any) => void;
  parentClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  label: string;
  value?: any;
  cols?: number;
  rows?: number;
  disable?: boolean;
};
export default function Input({
  type,
  onChange,
  labelClassName,
  parentClassName,
  inputClassName,
  label,
  value,
  cols,
  rows,
  disable,
}: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className={`mb-4 ${parentClassName}`}>
      <label
        className={`block  text-sm font-bold mb-2 ${labelClassName}`}
        htmlFor={label}
      >
        {label}
      </label>
      <div className="relative">
        {type == "textarea" ? (
          <textarea
            disabled={disable}
            id={label}
            value={value}
            onChange={onChange}
            rows={rows}
            cols={cols}
            className={`resize-none appearance text-gray-800 dark:text-gray-100  text-sm border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${inputClassName}`}
          ></textarea>
        ) : (
          <input
            disabled={disable}
            className={`appearance-none dark:text-gray-100 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${inputClassName}`}
            id={label}
            type={passwordVisible ? "text" : type}
            value={value}
            onChange={onChange}
          />
        )}
        {type === "password" ? (
          <div
            className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
          >
            <EyeIcon active={passwordVisible} color="silver" width={20} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
