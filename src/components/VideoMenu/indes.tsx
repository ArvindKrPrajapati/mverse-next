"use client";
import React, { useState } from "react";
import { DotMenuIcon, ShareIcon, TimerIcon } from "../_icons";
import Modal from "../Modal";
import useModal from "@/hooks/useModal";
import { share } from "@/lib/common";
import Spinner from "../Loading/Spinner";
import toast from "react-hot-toast";
import { mversePost } from "@/lib/apiCalls";

type Props = {
  _id: string;
  link: string;
};

function VideoMenu({ link, _id }: Props) {
  const { isOpen, onClose, onOpen } = useModal();
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: any, type: string) => {
    e.stopPropagation();

    switch (type) {
      case "share":
        await share("title", "test", link);
        onClose();
        break;
      case "watchlist":
        try {
          setLoading(true);
          await mversePost("/api/user/playlist", {
            videoId: _id,
            name: "Watch later",
            isPrivate: true,
          });
        } catch (error) {
          toast.error("error while adding");
        } finally {
          setLoading(false);
          onClose();
        }
        break;

      default:
        break;
    }
  };

  const btnClass =
    "w-full flex hover:outline-none justify-start py-2 px-3 rounded-md active:dark:bg-neutral-800 active:bg-gray-200 flex gap-2 items-center";
  const content = (
    <>
      <button
        onClick={(e) => handleClick(e, "watchlist")}
        className={`${btnClass}`}
        disabled={loading}
      >
        {loading ? (
          <Spinner className="w-[20px] h-[20px]" />
        ) : (
          <TimerIcon width={20} />
        )}
        Add to watchlist
      </button>
      <button
        onClick={(e) => handleClick(e, "share")}
        className={`${btnClass}`}
      >
        <ShareIcon width={20} />
        share
      </button>
    </>
  );
  return (
    <>
      <Modal
        title="menu"
        isOpen={isOpen}
        onClose={onClose}
        isMenu={true}
        body={content}
        backdropClose={true}
      />
      <button onClick={onOpen} className="hover:outline-none p-2">
        <DotMenuIcon width={20} />
      </button>
    </>
  );
}

export default VideoMenu;
