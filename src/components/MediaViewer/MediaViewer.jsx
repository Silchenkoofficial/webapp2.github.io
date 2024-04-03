import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { PlayIcon } from "../Slider/components/VideoSlide/VideoSlide.styled";

const MediaItem = React.memo(({ file, url, type, setIsMoreThanTen }) => {
  const videoRef = useRef(null);
  const { deleteFile } = useStore();
  const fileType = file?.type.split("/")[0];
  const [Confirm, setConfirm] = useConfirm();
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

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

  return (
    <>
      <Confirm />
      <MediaSlide>
        {fileType === "image" ? (
          <ImageSlide src={url} />
        ) : (
          <>
            <VideoLabel>
              <PlayIcon />
              {(videoDuration - currentTime / 100).toFixed(2)}
            </VideoLabel>
            <VideoSlide
              ref={videoRef}
              src={url}
              file={file}
              setVideoDuration={setVideoDuration}
              setCurrentTime={setCurrentTime}
            />
          </>
        )}
        <DeleteButton onClick={() => handleDeleteFile(file.name)}>
          <TrashIcon />
        </DeleteButton>
      </MediaSlide>
    </>
  );
});

export const MediaViewer = ({
  files,
  type,
  isMoreThanTen,
  setIsMoreThanTen,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFullscreen = useCallback(
    (index) => {
      console.log(1);
      setActiveIndex(index === activeIndex ? null : index);
    },
    [activeIndex]
  );

  return (
    !!files?.length && (
      <ViewerWrapper>
        <Swiper slidesPerView={"auto"} spaceBetween={"8"}>
          {files?.map((file, index) => {
            console.log(file);
            return (
              <SwiperSlide key={file.name}>
                <MediaItem
                  file={file}
                  url={URL.createObjectURL(file)}
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
};
