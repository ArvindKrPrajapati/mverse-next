"user client";
import React, { useEffect } from "react";
type Props = {
  url?: string;
  onLoadedMetaData?: (e: any) => void;
};
export default function MversePlayer({ url, onLoadedMetaData }: Props) {
  if (!url) {
    return (
      <div className="w-full aspect-video bg-black flex justify-center items-center">
        Add link to see preview
      </div>
    );
  }
  return (
    <video
      controls={true}
      autoPlay={true}
      preload="metadata"
      className="w-full aspect-video bg-black"
      onLoadedMetadata={onLoadedMetaData}
      src={url}
    />
  );
}
