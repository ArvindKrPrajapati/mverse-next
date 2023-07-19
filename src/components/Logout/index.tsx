"use client";
import { mverseGet } from "@/lib/apiCalls";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LogoutIcon } from "../_icons";
import useModal from "@/hooks/useModal";

export default function Logout({ className, text = false }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toggleDisabled } = useModal();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const closeModal = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    current.delete("user");
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };
  const logmeout = async () => {
    try {
      setLoading(true);
      toggleDisabled();
      const res = await mverseGet("/api/auth/logout");
      toast.success(res.data.message);
      setLoading(false);
      toggleDisabled();
      router.refresh();
      // router.replace("/");
      closeModal();
    } catch (error) {
      console.log("logout error:", error);
      toast.error("something went wrong");
    }
  };
  return (
    <button
      onClick={logmeout}
      disabled={loading}
      className={`p-3 w-full border-0 hover:opacity-70 transition disabled:opacity-50 flex items-center ${className}`}
    >
      <LogoutIcon />
      {text ? <p className="text-gray-200 pl-2">Logout</p> : null}
    </button>
  );
}
