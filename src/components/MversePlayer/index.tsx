"use client";
import React, { useEffect, useRef } from "react";
type Props = {
  url?: string;
  onLoadedMetaData?: (e: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
  title?: string;
};

import "./style.css";
import {
  AspectRatioIcon,
  BackwardIcon,
  ForwardIcon,
  FullscreenIcon,
  PauseIcon,
  PlayIcon,
} from "./icons";
import { formatTime } from "@/lib/common";

export default function MversePlayer({ url, title, onLoadedMetaData }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const playBtn = useRef<HTMLDivElement>(null);
  const pauseBtn = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLInputElement>(null);
  const timeDisplay = useRef<HTMLDivElement>(null);
  const loader_container = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const controls = useRef<HTMLDivElement>(null);

  const handleLoadedMetaData = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    if (onLoadedMetaData) {
      onLoadedMetaData(e);
    }
    const currentTime = formatTime(video.current?.currentTime || 0);
    setTime(currentTime);
    setSlider(video.current?.currentTime || 0);
  };

  const handleTimeUpdate = () => {
    var currentTime = formatTime(video.current?.currentTime || 0);
    setTime(currentTime);
    setSlider(video.current?.currentTime || 0);
  };

  const handleCanPlay = () => {
    waitAndHide(5000);
    if (loader_container.current && loader.current) {
      loader_container.current.style.background = "transparent";
      loader.current.style.display = "none";
    }
  };
  const handleWaiting = () => {
    if (loader.current) {
      loader.current.style.display = "block";
    }
  };

  const handlePlayBtnClick = (event: any) => {
    event.stopPropagation();
    togglePlay();
  };

  const handlePauseBtnClick = (event: any) => {
    handlePlayBtnClick(event);
  };

  const handleSliderChange = (event: any) => {
    event.stopPropagation();
    if (!slider.current || !video.current) return;
    var duration = video.current?.duration || 0;
    const value: any = slider.current.value;
    var currentTime = (value / 100) * duration;
    video.current.currentTime = currentTime;
    setTime(formatTime(currentTime));
  };

  const handleAspectRatio = (event: any) => {
    event.stopPropagation();
    if (!video.current) return;
    const ar = video.current.style.objectFit;
    if (!ar) {
      video.current.style.objectFit = "fill";
    } else if (ar === "fill") {
      video.current.style.objectFit = "cover";
    } else {
      video.current.style.objectFit = "";
    }
  };

  const handleForward = (event: any) => {
    event.stopPropagation();
    if (!video.current) return;
    const toskip = video.current.currentTime + 10;
    video.current.currentTime = toskip;
    setTime(formatTime(toskip));
    setSlider(toskip);
  };
  const handleBackward = (event: any) => {
    event.stopPropagation();
    if (!video.current) return;
    const toskip = video.current.currentTime - 10;
    video.current.currentTime = toskip;
    setTime(formatTime(toskip));
    setSlider(toskip);
  };

  const handleFullScreen = (event: any) => {
    event.stopPropagation();
    const video_container: any = document.querySelector(".video-container");
    const footer: any = document.querySelector(".footer");
    const spinner: any = document.querySelector(".spinner");
    if (!slider.current || !footer || !spinner) return;

    if (!document.fullscreenElement) {
      slider.current.style.position = "relative";
      slider.current.style.bottom = "80px";
      footer.style.padding = "0 14px 0px 14px";
      spinner.style.marginBottom = "35px";
      if (video_container.requestFullscreen) {
        video_container.requestFullscreen();
      } else if (video_container.mozRequestFullScreen) {
        // Firefox
        video_container.mozRequestFullScreen();
      } else if (video_container.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        video_container.webkitRequestFullscreen();
      } else if (video_container.msRequestFullscreen) {
        // IE/Edge
        video_container.msRequestFullscreen();
      }
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape");
      }
    } else {
      slider.current.style.position = "absolute";
      slider.current.style.bottom = "-1px";
      footer.style.padding = "0";
      spinner.style.marginBottom = "15px";

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        // Firefox
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) {
        // Chrome, Safari and Opera
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        // IE/Edge
        (document as any).msExitFullscreen();
      }

      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    }
  };

  const hideLoader = () => {
    if (!controls.current) return;
    controls.current.style.visibility = "visible";
    waitAndHide(7000);
  };
  const hideControls = () => {
    if (!controls.current) return;
    controls.current.style.visibility = "hidden";
  };
  // helper functions

  const waitAndHide = (t: number) => {
    if (controls.current && !controls.current.style.visibility) {
      if (video.current?.paused) return;
      const timeout = setTimeout(() => {
        if (controls.current) {
          controls.current.style.visibility = "hidden";
        }
        clearTimeout(timeout);
      }, t);
    }
  };

  const togglePlay = () => {
    if (!video.current || !playBtn.current || !pauseBtn.current) return;

    if (video.current.paused) {
      video.current.play();
      playBtn.current.style.display = "none";
      pauseBtn.current.style.display = "block";
    } else {
      video.current.pause();
      playBtn.current.style.display = "block";
      pauseBtn.current.style.display = "none";
    }
  };

  const setTime = (currentTime: string) => {
    const duration = formatTime(video.current?.duration || 0);
    if (duration && timeDisplay?.current) {
      timeDisplay.current.textContent = currentTime + " / " + duration;
    }
  };
  const setSlider = (currentTime: number) => {
    const duration = video.current?.duration || 0;
    if (duration && slider?.current) {
      slider.current.value = ((currentTime / duration) * 100).toString();
    }
  };

  if (!url) {
    return (
      <div className="w-full aspect-video bg-black flex justify-center items-center">
        No video to show
      </div>
    );
  }
  return (
    <div className="player">
      <div className="video-container">
        <div
          ref={loader_container}
          onClick={hideLoader}
          className="loader-container"
        >
          <div ref={loader} className="spinner"></div>
        </div>
        <div className="controls" ref={controls} onClick={hideControls}>
          {/* header */}
          <div className="video-header max-one-line">{title || "no title"}</div>
          {/* middle */}
          <div className="video-controls">
            <div
              onClick={(event) => {
                handleBackward(event);
              }}
            >
              <BackwardIcon width={30} />
            </div>
            <div>
              <div ref={pauseBtn} onClick={handlePauseBtnClick}>
                <PauseIcon width={50} />
              </div>
              <div
                ref={playBtn}
                className="playBtn"
                onClick={handlePlayBtnClick}
              >
                <PlayIcon width={45} />
              </div>
            </div>
            <div
              onClick={(event) => {
                handleForward(event);
              }}
            >
              <ForwardIcon width={30} />
            </div>
          </div>
          {/* footer */}
          <div className="footer">
            <div className="timerAndMenu">
              <div>
                <small ref={timeDisplay} className="text-white">
                  00:00
                </small>
              </div>
              <div className="video-menus">
                <div
                  onClick={(event) => {
                    handleAspectRatio(event);
                  }}
                >
                  <AspectRatioIcon />
                </div>
                {/* <div>
                  <SettingIcon />
                </div> */}
                <div
                  onClick={(event) => {
                    handleFullScreen(event);
                  }}
                >
                  <FullscreenIcon />
                </div>
              </div>
            </div>
            <input
              className="video-range"
              ref={slider}
              type="range"
              min={0}
              max={100}
              onChange={handleSliderChange}
            />
          </div>
        </div>
        {url ? (
          <video
            ref={video}
            src={url}
            autoPlay={true}
            onLoadedMetadata={handleLoadedMetaData}
            onTimeUpdate={handleTimeUpdate}
            onCanPlay={handleCanPlay}
            onWaiting={handleWaiting}
            preload="metadata"
            controls={true}
          ></video>
        ) : null}
      </div>
    </div>
  );
}
