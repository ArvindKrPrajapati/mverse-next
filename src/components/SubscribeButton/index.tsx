"use client";
import React, { useState } from "react";
import Button from "../Button";
import toast from "react-hot-toast";
import { mversePatch } from "@/lib/apiCalls";
import { useRouter } from "next/navigation";
type Props = {
  username: string;
  isSubscribed: boolean;
  currentUser?: any;
  className?: string;
};
export default function SubscribeButton({
  username,
  isSubscribed,
  currentUser,
  className,
}: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      setLoading(true);
      if (!currentUser?._id) {
        toast.error("login to subscribe");
        setLoading(false);
        router.push("?user=login");
        return;
      }
      const res = await mversePatch("/api/user/channel/" + username, {});
      if (res.success) {
        toast.success(res.data.message);
        router.refresh();
      } else {
        toast.error(res.error);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("subscribe errro:", error);
      toast.error("something went wrong");
    }
  };
  return (
    <Button
      label={isSubscribed ? "unsubscribe" : "subscribe"}
      className={`w-[120px] rounded-full ${className}`}
      onClick={handleClick}
      disabled={loading}
    />
  );
}
