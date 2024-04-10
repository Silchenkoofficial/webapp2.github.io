import React, {
  createRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  ViewerWrapper,
  MediaSlide,
  DeleteButton,
  TrashIcon,
  VideoLabel,
} from "./MediaViewer.styled";
import { ImageSlide, VideoSlide } from "./components";
import { useConfirm } from "../../hooks/useConfirm";
import { useStore } from "../../store/StoreContext";
import {
  PauseIcon,
  PlayIcon,
} from "../Slider/components/VideoSlide/VideoSlide.styled";

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.type === nextProps.type &&
    prevProps.isMoreThanTen === nextProps.isMoreThanTen &&
    prevProps.setIsMoreThanTen === nextProps.setIsMoreThanTen &&
    prevProps.files?.length === nextProps.files?.length &&
    prevProps.files?.every((file, index) => file === nextProps.files[index])
  );
};

const MediaItem = ({ file, url, type, setIsMoreThanTen }) => {
  const videoRef = useRef(null);
  const { deleteFile } = useStore();
  const fileType = file?.type.split("/")[0];
  const [Confirm, setConfirm] = useConfirm();
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDeleteFile = useCallback(
    async (fileName) => {
      setConfirm({
        title: "Вы действительно хотите удалить эту фотографию?",
        type: "confirm",
        confirmText: "Удалить",
        dismissText: "Отменить",
      }).then(
        async () => {
          setIsMoreThanTen(false);
          await deleteFile(fileName, type);
        },
        () => {}
      );
    },
    [deleteFile, setIsMoreThanTen, type]
  );

  const togglePlay = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying((prevState) => !prevState);
  };

  return (
    <>
      <Confirm />
      <MediaSlide>
        {fileType === "image" ? (
          <ImageSlide src={url} />
        ) : (
          <>
            <VideoLabel onClick={togglePlay}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
              {!!videoDuration &&
                ((videoDuration - currentTime) / 100).toFixed(2)}
            </VideoLabel>
            <VideoSlide
              ref={videoRef}
              src={url}
              file={file}
              setVideoDuration={setVideoDuration}
              setCurrentTime={setCurrentTime}
              setIsPlaying={setIsPlaying}
            />
          </>
        )}
        <DeleteButton onClick={() => handleDeleteFile(file.name)}>
          <TrashIcon />
        </DeleteButton>
      </MediaSlide>
    </>
  );
};

export const MediaViewer = memo(
  ({ files, type, isMoreThanTen, setIsMoreThanTen }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const fileURLs = useMemo(
      () => files?.map((file) => URL.createObjectURL(file)),
      [files]
    );

    useEffect(() => {
      return () => {
        fileURLs?.forEach(URL.revokeObjectURL);
      };
    }, [fileURLs]);

    const toggleFullscreen = useCallback(
      (index) => {
        console.log(1);
        setActiveIndex(index === activeIndex ? null : index);
      },
      [activeIndex]
    );

    return (
      !!fileURLs?.length && (
        <ViewerWrapper>
          <Swiper slidesPerView={"auto"} spaceBetween={"8"}>
            {fileURLs?.map((url, index) => {
              console.log(files[index]);
              return (
                <SwiperSlide key={files[index].name}>
                  <MediaItem
                    file={files[index]}
                    url={url}
                    isActive={index === activeIndex}
                    onClick={() => toggleFullscreen(index)}
                    type={type}
                    isMoreThanTen={isMoreThanTen}
                    setIsMoreThanTen={setIsMoreThanTen}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </ViewerWrapper>
      )
    );
  },
  areEqual
);
