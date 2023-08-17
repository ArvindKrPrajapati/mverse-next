"use client";
import React, { useState } from "react";
import {
  AddMultipleIcon,
  ChevronLeft,
  DotMenuIcon,
  EarthIcon,
  LockIcon,
  Plusicon,
  ShareIcon,
  TimerIcon,
} from "../_icons";
import Modal from "../Modal";
import useModal from "@/hooks/useModal";
import { share } from "@/lib/common";
import Spinner from "../Loading/Spinner";
import toast from "react-hot-toast";
import { mversePatch, mversePost } from "@/lib/apiCalls";
import Input from "../Input";
import Button from "../Button";
import LoadMore from "../LoadMore";

type Props = {
  _id: string;
  link: string;
  currentUser?: any;
};

const btnClass =
  "w-full flex hover:outline-none justify-start py-2 px-3 rounded-md active:dark:bg-neutral-800 active:bg-gray-200 flex gap-2 items-center transition";

function VideoMenu({ link, _id, currentUser = {} }: Props) {
  const { isOpen, onClose, onOpen } = useModal();
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState("");
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [playlistCreating, setPlaylistCreating] = useState(false);

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
          const res = await mversePost("/api/user/playlist", {
            videoId: _id,
            name: "Watch later",
            isPrivate: true,
          });
          if (res.error) {
            toast.error(res.error);
          }
        } catch (error) {
          toast.error("error while adding");
        } finally {
          setLoading(false);
          onClose();
        }
        break;
      case "playlist":
        setScreen("playlist");
        break;
      case "create":
        setScreen("create");
        break;
      case "back":
        setScreen("");
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setPlaylistCreating(true);
      if (name.length >= 5 && name.length <= 20) {
        const obj = {
          name,
          isPrivate,
          videoId: _id,
        };
        const res = await mversePost("/api/user/playlist", obj);
        if (res.success) {
          toast.success(res.data.message);
          handleClose();
        } else {
          toast.error(res.error);
        }
      } else {
        toast.error("Nane is too short or long");
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setPlaylistCreating(false);
    }
  };

  const handlePatch = async (e: any, id: string) => {
    const res = await mversePatch("/api/user/playlist/" + id, { videoId: _id });
    handleClose();
    return res;
  };

  let content = (
    <>
      {currentUser?._id ? (
        <>
          <button
            onClick={(e) => handleClick(e, "playlist")}
            className={`${btnClass}`}
          >
            <AddMultipleIcon width={20} />
            Add to playlist
          </button>
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
        </>
      ) : null}
      <button
        onClick={(e) => handleClick(e, "share")}
        className={`${btnClass}`}
      >
        <ShareIcon width={20} />
        share
      </button>
    </>
  );

  if (screen === "playlist") {
    content = (
      <>
        <div className="flex justify-between items-center p-1 border-b dark:border-gray-800 border-gray-200">
          <div
            onClick={(e) => handleClick(e, "back")}
            className="flex items-center gap-5"
          >
            <ChevronLeft width={20} />
            Add to playlist
          </div>
          <button
            onClick={(e) => handleClick(e, "create")}
            className="hover:outline-none  rounded-md active:dark:bg-neutral-800 active:bg-gray-200 p-1 transition"
          >
            <Plusicon />
          </button>
        </div>

        <LoadMore offset={0} url="/api/user/playlist">
          <RenderPlaylist handlePatch={handlePatch} />
        </LoadMore>
      </>
    );
  }

  if (screen === "create") {
    content = (
      <>
        <div
          onClick={(e) => handleClick(e, "playlist")}
          className="flex items-center gap-5 p-1"
        >
          <ChevronLeft width={20} />
          Create playlist
        </div>

        <form onSubmit={handleSubmit} className="p-3 px-4">
          <div className="mb-6">
            <Input
              type="text"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              parentClassName="mb-0"
              maxLength={20}
            />
            <small className="bg-red-700">
              {name.length >= 20 ? "Max name limit reached" : ""}
            </small>
          </div>

          <div className="flex items-center space-x-4 mb-3">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="true"
                checked={isPrivate}
                onChange={() => setIsPrivate(true)}
                className="form-radio text-blue-500"
              />
              <span>Private</span>
            </label>
            {currentUser?.username ? (
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="false"
                  checked={!isPrivate}
                  onChange={() => setIsPrivate(false)}
                  className="form-radio text-blue-500"
                />
                <span>Public</span>
              </label>
            ) : null}
          </div>
          <Button
            label={playlistCreating ? "createing..." : "Create"}
            disabled={playlistCreating}
            type="submit"
          />
        </form>
      </>
    );
  }

  const handleClose = () => {
    setScreen("");
    setLoading(false);
    setName("");
    setIsPrivate(true);
    setPlaylistCreating(false);
    onClose();
  };
  return (
    <>
      <Modal
        title="menu"
        isOpen={isOpen}
        onClose={handleClose}
        isMenu={true}
        body={content}
        backdropClose={true}
        showHeader={false}
      />
      <button onClick={onOpen} className="hover:outline-none p-2">
        <DotMenuIcon width={20} />
      </button>
    </>
  );
}

export default VideoMenu;

function RenderPlaylist({ item, handlePatch }: any) {
  const [loading, setLoading] = useState(false);
  const handleClick = async (e: any, id: string) => {
    try {
      setLoading(true);
      await handlePatch(e, id);
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={(e) => handleClick(e, item._id)}
      disabled={loading}
      className={`${btnClass} justify-between`}
    >
      <div className="flex items-center gap-3">
        {loading ? (
          <Spinner className="h-[20px] w-[20px]" />
        ) : (
          <Plusicon width={20} />
        )}
        {item.name}
      </div>
      <div>
        {item.isPrivate ? <LockIcon width={20} /> : <EarthIcon width={20} />}
      </div>
    </button>
  );
}
