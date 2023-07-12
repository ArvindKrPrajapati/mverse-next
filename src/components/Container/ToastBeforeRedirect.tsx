"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function ToastBeforeRedirect() {
  const router = useRouter();
  useEffect(() => {
    toast.error("login first");
    router.push("?user=login");
  }, []);
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <div>
        <p className="text-xl font-bold my-1"> Not Authorized</p>
        <Link href="?user=login" className="text-sm">
          Login
        </Link>
        <hr className="mt-1" />
      </div>
    </div>
  );
}
