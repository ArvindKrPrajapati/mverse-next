"use client";
import React, { useState } from "react";
import Button from "../Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { mverseGet, mversePost } from "@/lib/apiCalls";
type props = {
  toggleDisabled: () => void;
  user: any;
};
export default function CreateChannel({ toggleDisabled, user }: props) {
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const [data, setData] = useState([]);

  const validateNameLength = (name: string) => {
    return name.length <= 3;
  };

  const handleChange = async (text: string) => {
    setName(text);
    if (validateNameLength(text)) {
      setData([]);
      return;
    }
    try {
      setSearching(true);
      const res = await mverseGet("/api/user/channel?limit=1&name=" + text);
      if (res.success) {
        setData(res.data);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log("create channel error:", error);
      toast.error("something went wrong");
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateNameLength(name) || data.length) {
      toast.error("Invalid channel name");
      return;
    }
    try {
      setLoading(true);
      toggleDisabled();
      const res = await mversePost("/api/user/channel", {
        channelName: name,
        description,
      });
      if (res.success) {
        toast.success("Channel created successfully");
        router.replace("/profile/" + res.data.username);
        router.refresh();
      } else {
        toast.error(res.error);
      }
      toggleDisabled();
      setLoading(false);
    } catch (error) {
      toggleDisabled();
      setLoading(false);
      console.log("channel submit error:", error);
      toast.error("something went wrong");
    }
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
          <p className="text-[0.7em] mt-1">
            {!validateNameLength(name) && !searching ? (
              <div>
                {!data.length ? (
                  <p className="text-green-400">{name} is available</p>
                ) : (
                  <p className="text-red-400">{name} is not available</p>
                )}
              </div>
            ) : (
              <label>
                {searching
                  ? "searching..."
                  : "Enter at least 4 letter to search"}
              </label>
            )}
          </p>
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
          disabled={loading || searching}
        />
      </form>
    </main>
  );
}
