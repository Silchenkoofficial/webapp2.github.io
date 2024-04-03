import { useRef, useState, useEffect } from "react";

export const VideoSlide = ({
  ref,
  src,
  file,
  setVideoDuration,
  setCurrentTime,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!ref?.current) return;

    const video = ref.current;

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
  }, [ref]);

  return (
    <>
      <video
        ref={ref}
        width={"150"}
        height={"100%"}
        controls={false}
        playsInline
        preload="metadata"
      >
        <source src={src} type={file?.type} />
        Тег video не поддерживается вашим браузером.
      </video>
    </>
  );
};
