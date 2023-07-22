"use client";
import React, { useState } from "react";
import MversePlayer from "@/components/MversePlayer";
import { mversePost } from "@/lib/apiCalls";
import { useRouter } from "next/navigation";

type Props = {
  videoId: string;
  url: string;
  title: string;
};
export default function AddView({ videoId, url, title }: Props) {
  const [apiCalled, setApiCalled] = useState(false);
  const router = useRouter();

  const _init = async (time: number) => {
    if (Math.floor(time) >= 5 && !apiCalled) {
      setApiCalled(true);
      await mversePost("/api/video/view", { videoId });
      // router.refresh();
    }
  };

  return <MversePlayer url={url} title={title} onProgressVideo={_init} />;
}
