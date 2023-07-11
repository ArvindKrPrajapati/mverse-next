"use client";
import { mverseGet } from "@/lib/apiCalls";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LogoutIcon } from "../_icons";
import useModal from "@/hooks/useModal";

export default function Logout({ className }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toggleDisabled } = useModal();

  const logmeout = async () => {
    try {
      setLoading(true);
      toggleDisabled();
      const res = await mverseGet("/api/auth/logout");
      toast.success(res.data.message);
      setLoading(false);
      toggleDisabled();
      router.refresh();
      router.replace("/");
    } catch (error) {
      console.log("logout error:", error);
      toast.error("something went wrong");
    }
  };
  return (
    <button
      onClick={logmeout}
      disabled={loading}
      className={`p-1 border-0 hover:opacity-70 transition disabled:opacity-50 ${className}`}
    >
      <LogoutIcon />
    </button>
  );
}
