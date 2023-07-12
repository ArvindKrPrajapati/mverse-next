"use client";
import React from "react";
import Input from "../Input";
import Button from "../Button";

export default function UploadForm() {
  const options = [
    {
      label: "Title",
      type: "text",
    },
    {
      label: "Description",
      type: "textarea",
    },
    {
      label: "Thumbnail",
      type: "text",
    },
    {
      label: "Link",
      type: "text",
    },
  ];
  return (
    <form className="md:w-1/2 mx-auto mt-10 px-3">
      <p className="text-xl font-bold mb-4">Upload video</p>
      <div>
        {options.map((item, index) => (
          <Input key={index} label={item.label} type={item.type} />
        ))}
        <Button label="upload" className="mt-2" />
      </div>
    </form>
  );
}
