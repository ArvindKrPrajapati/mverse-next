"use client";
import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import MversePlayer from "../MversePlayer";
import Container from "../Container";
import toast from "react-hot-toast";
import { mversePost } from "@/lib/apiCalls";
import { useRouter } from "next/navigation";
import { formatTime } from "@/lib/common";

export default function UploadForm() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const router = useRouter();

  const handleValidate = () => {
    if (!title) {
      toast.error("title is required");
      return false;
    }
    if (!thumbnail) {
      toast.error("thumbnail is required");
      return false;
    }
    if (!link) {
      toast.error("link is required");
      return false;
    }
    if (!description) {
      toast.error("description is required");
      return false;
    }
    if (!duration) {
      toast.error("wait duration is loading or invalid link");
      return false;
    }
    return true;
  };

  const handleChange = (
    input: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (input) {
      case "title":
        setTitle(e.target.value);
        break;
      case "thumbnail":
        setThumbnail(e.target.value);
        break;
      case "link":
        setDuration(0);
        setLink(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) {
      return;
    }
    try {
      setLoading(true);
      const res = await mversePost("/api/video", {
        title,
        thumbnail,
        link,
        description,
        duration,
      });
      if (res.success) {
        toast.success(res.data.message);
        router.refresh();
        router.replace("/");
      } else {
        toast.error(res.error);
      }
      setLoading(false);
    } catch (error) {
      toast.error("something went wrong");
      setLoading(false);
      console.log(error);
    }
  };
  const handleLoadedMetaData = (e: any) => {
    const value = Math.floor(e.target.duration);
    setDuration(value);
  };
  return (
    <main className="md:flex w-full md:mt-20 max-w-7xl mx-auto lg:px-6">
      <div className="md:w-[50%] md:mt-5">
        <MversePlayer
          onLoadedMetaData={handleLoadedMetaData}
          url={link.endsWith(".mp4") || link.endsWith(".mkv") ? link : ""}
        />
      </div>
      <Container className="p-6 m-0 md:w-[50%]">
        <form className="my-4 w-full" onSubmit={handleSubmit}>
          <p className="text-xl font-bold mb-3">Upload video</p>
          <div className="w-full">
            <Input
              label="Title"
              type="text"
              value={title}
              onChange={(e) => handleChange("title", e)}
            />
            <Input
              label="Thumbnail"
              type="text"
              value={thumbnail}
              onChange={(e) => handleChange("thumbnail", e)}
            />
            <Input
              label="Link"
              type="text"
              value={link}
              onChange={(e) => handleChange("link", e)}
            />
            <Input
              label="Duration"
              type="text"
              value={formatTime(duration)}
              disable={true}
              inputClassName="text-gray-200"
            />
            <Input
              label="Description"
              type="textarea"
              rows={5}
              value={description}
              onChange={(e) => handleChange("description", e)}
            />
            <Button
              label={loading ? "processing" : "upload"}
              disabled={loading}
              className="mt-2"
              type="submit"
            />
          </div>
        </form>
      </Container>
    </main>
  );
}
