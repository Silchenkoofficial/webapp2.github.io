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
} from "./FullscreenSlider.styled";

export const FullscreenSlider = ({
  children,
  onDelete,
  selectedIdx,
  setSelectedIdx,
  setIsFullscreen,
}) => {
  const tg = window.Telegram?.WebApp;
  const { Portal } = usePortal({ programmaticallyOpen: true });
  const [isHeaderShow, setIsHeaderShow] = useState(true);
  const slideRefs = useRef(children.map(() => React.createRef()));
  const backgroundRef = useRef(null);

  let startY = 0;
  let deltaY = 0;

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
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    if (tg) {
      tg.BackButton.isVisible = false;
    }
  };

  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
  };

  const handleTouchMove = (e, index) => {
    const currentY = e.touches[0].clientY;
    deltaY = currentY - startY;
    slideRefs.current[index].current.style.transform =
      `translateY(${-deltaY}px)`;
    slideRefs.current[index].current.style.transition = `none`;
  };

  const handleTouchEnd = (e, index) => {
    if (deltaY > 200) {
      slideRefs.current[index].current.style.transform = `translateY(0)`;
      slideRefs.current[index].current.style.transition = `transform 0.3s`;
      closeFullscreen();
    }
  };

  return (
    <Portal>
      <FullscreenWrapper ref={backgroundRef}>
        <FullscreenHeader isHeaderShow={isHeaderShow}>
          <BackButton>
            {/* <ArrowLeftIcon />
            Назад */}
          </BackButton>
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
            {React.Children.map(children, (child, index) => {
              return (
                <FullscreenSlide
                  key={index}
                  ref={slideRefs.current[index]}
                  onClick={(e) => setIsHeaderShow((prev) => !prev)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={(e, index) => handleTouchMove(e, index)}
                  onTouchEnd={(e, index) => handleTouchEnd(e, index)}
                >
                  {child}
                </FullscreenSlide>
              );
            })}
          </ReactSlick>
        </div>
      </FullscreenWrapper>
    </Portal>
  );
};
