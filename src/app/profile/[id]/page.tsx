"use client";
import userCurrentUser from "@/hooks/userCurrentUser";
import React from "react";
import toast from "react-hot-toast";
type props = {
  params: {
    id: string;
  };
};
export default function Profile({ params }: props) {
  const { logout } = userCurrentUser();
  const logmeout = () => {
    logout();
    toast.success("logout success");
  };
  return (
    <div className="p-3">
      <button
        onClick={logmeout}
        className="text-white bg-rose-400 px-6 py-2 rounded-md"
      >
        logout
      </button>
    </div>
  );
}
