"use client";
import React, { ChangeEvent, useState } from "react";
import { EyeIcon } from "../_icons";
type Props = {
  type: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  parentClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  label: string;
  value?: any;
};
export default function Input({
  type,
  onChange,
  labelClassName,
  parentClassName,
  inputClassName,
  label,
  value,
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
        <input
          className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${inputClassName}`}
          id={label}
          type={passwordVisible ? "text" : type}
          value={value}
          onChange={onChange}
        />
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
