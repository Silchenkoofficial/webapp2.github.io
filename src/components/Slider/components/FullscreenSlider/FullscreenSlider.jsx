import React, { useEffect, useRef, useState } from "react";
import usePortal from "react-useportal";
import ReactSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ArrowLeftIcon,
  BackButton,
  FilesCounter,
  FullscreenHeader,
  TrashWrapper,
  FullscreenWrapper,
  TrashIcon,
  FullscreenSlide,
  FullscreenFooter,
} from "./FullscreenSlider.styled";

export const FullscreenSlider = ({
  children,
  onDelete,
  selectedIdx,
  setSelectedIdx,
  isFullscreen,
  setIsFullscreen,
}) => {
  const tg = window.Telegram?.WebApp;
  const { Portal } = usePortal({ programmaticallyOpen: true });
  const [isHeaderShow, setIsHeaderShow] = useState(true);
  const slideRefs = useRef(children.map(() => React.createRef()));
  const backgroundRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedIdx,
    beforeChange: (_, index) => setSelectedIdx(index),
    focusOnSelect: false,
  };

  useEffect(() => {
    if (tg) {
      tg.BackButton.isVisible = true;
      tg.BackButton.onClick(() => {
        closeFullscreen();
      });
    }
  }, []);

  const handleDelete = (index) => {
    onDelete(children[index].props["data-file"].name);
    if (tg) {
      tg.BackButton.isVisible = false;
    }
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    if (tg) {
      tg.BackButton.isVisible = false;
    }
  };

  const toggleHeaderShow = (e) => setIsHeaderShow((prev) => !prev);

  return (
    <Portal>
      <FullscreenWrapper ref={backgroundRef}>
        <FullscreenHeader isHeaderShow={isHeaderShow}>
          <div>
            <BackButton onClick={closeFullscreen}>
              <ArrowLeftIcon />
              Назад
            </BackButton>
          </div>
          <FilesCounter>
            {selectedIdx + 1} из {children.length}
          </FilesCounter>
          <TrashWrapper>
            {onDelete && (
              <TrashIcon onClick={() => handleDelete(selectedIdx)} />
            )}
          </TrashWrapper>
        </FullscreenHeader>
        <div
          style={{
            height: "100.1vh",
          }}
        >
          <ReactSlick {...settings} className={"slider-container"}>
            {React.Children.map(children, (child) => {
              console.log(child);
              return (
                <>
                  <FullscreenSlide
                    key={child.key}
                    ref={slideRefs.current[child.key]}
                    onClick={toggleHeaderShow}
                  >
                    {child}
                  </FullscreenSlide>
                </>
              );
            })}
          </ReactSlick>
        </div>
        <FullscreenFooter isHeaderShow={isHeaderShow}>
          <div>asdasd</div>
        </FullscreenFooter>
      </FullscreenWrapper>
    </Portal>
  );
};
