import { useRef, useState, useEffect, forwardRef, memo } from "react";

export const VideoSlide = memo(
  forwardRef(
    ({ src, file, setVideoDuration, setCurrentTime, setIsPlaying }, ref) => {
      const [poster, setPoster] = useState("");
      const posterCreated = useRef(false);

      useEffect(() => {
        if (!ref?.current || posterCreated.current) return;

        const video = ref.current;

        const handleLoadedMetadata = () => {
          setVideoDuration(video.duration);
        };

        const handleCanPlayThrough = () => {
          if (posterCreated.current) return;
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            const posterURL = URL.createObjectURL(blob);
            setPoster(posterURL);
          });
          posterCreated.current = true;
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
        video.addEventListener("loaddata", handleCanPlayThrough);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("ended", handleVideoEnd);
        video.addEventListener("pause", handleVideoPause);

        return () => {
          video.removeEventListener("loadedmetadata", handleLoadedMetadata);
          video.removeEventListener("loaddata", handleCanPlayThrough);
          video.removeEventListener("timeupdate", handleTimeUpdate);
          video.removeEventListener("ended", handleVideoEnd);
          video.removeEventListener("pause", handleVideoPause);
        };
      }, [ref]);

      return (
        <video
          ref={ref}
          width={"150px"}
          height={"100%"}
          controls={false}
          playsInline={true}
          preload="metadata"
        >
          <source src={src} type={file?.type} />
          Тег video не поддерживается вашим браузером.
        </video>
      );
    }
  )
);
