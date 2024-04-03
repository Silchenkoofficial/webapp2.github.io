import { useEffect, useRef, useState } from "react";
import {
  VideoSlideWrapper,
  ControlsWrapper,
  ControlButton,
  PlayIcon,
  PauseIcon,
  CustomPlayer,
} from "./VideoSlide.styled";

export const VideoSlide = ({ file, isFullscreen }) => {
  const videoSlideRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!videoSlideRef.current) return;

    const video = videoSlideRef.current;

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
      video.currentTime = 0;
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleVideoPause = () => {
      setIsPlaying(false);
    };

    const handleVideoEnd = () => {
      setIsPlaying(false);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("pause", handleVideoPause);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("pause", handleVideoPause);
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!videoSlideRef.current) return;
    if (isPlaying) {
      videoSlideRef.current.pause();
    } else {
      videoSlideRef.current.play();
    }

    setIsPlaying((prevState) => !prevState);
  };

  const remainingTime = videoDuration - currentTime;

  return (
    <VideoSlideWrapper>
      <video
        ref={videoSlideRef}
        controls={false}
        playsInline
        preload="metadata"
      >
        <source src={URL.createObjectURL(file)} />
      </video>
      {!isFullscreen && (
        <ControlsWrapper>
          <ControlButton onClick={togglePlay}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
            {(remainingTime / 100).toFixed(2)}
          </ControlButton>
        </ControlsWrapper>
      )}
    </VideoSlideWrapper>
  );
};
