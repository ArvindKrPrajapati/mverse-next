"use client";
import { mverseGet } from "@/lib/apiCalls";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const logmeout = async () => {
    try {
      setLoading(true);
      const res = await mverseGet("/api/auth/logout");
      toast.success(res.data.message);
      setLoading(false);
      router.refresh();
    } catch (error) {
      console.log("logout error:", error);
      toast.error("something went wrong");
    }
  };
  return (
    <div className="p-3">
      <button
        onClick={logmeout}
        disabled={loading}
        className="text-white bg-rose-400 px-6 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? "loading.." : "logout"}
      </button>
    </div>
  );
}
