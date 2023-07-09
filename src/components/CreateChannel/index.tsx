"use client";
import React, { useState } from "react";
import Button from "../Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
type props = {
  toggleDisabled: () => void;
  user: any;
};
export default function CreateChannel({ toggleDisabled, user }: props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleChange = async (text: string) => {
    setName(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error("Channel name is required");
      return;
    }
    setLoading(true);
    toggleDisabled();
    setTimeout(() => {
      toast.success("work in progress");
      toggleDisabled();
      router.refresh();
      router.replace("/profile/" + user?._id);
      setLoading(false);
    }, 2000);
  };

  return (
    <main>
      <p className="text-xl font-bold text-center mb-4">hi! {user?.name}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block  text-sm font-bold mb-2"
            htmlFor="channelName"
          >
            Your channel name *
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="channelName"
            type="text"
            value={name}
            maxLength={25}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block  text-sm font-bold mb-2"
            htmlFor="channelName"
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="appearance-none text-gray-800 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline resize-none"
          ></textarea>
        </div>
        <Button
          label={loading ? "processing.." : "Create channel"}
          type="submit"
          disabled={loading}
        />
      </form>
    </main>
  );
}
