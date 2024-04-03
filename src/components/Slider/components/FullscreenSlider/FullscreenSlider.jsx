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
  const [startY, setStartY] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [isDragging, setIsDragging] = useState(false);

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
  
  //useEffect(() => {
  //  if (selectedIdx !== null) {
  //    settings.initialSlide = selectedIdx;
  //  }
  //}, [selectedIdx])

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
    setStartY(e.touches[0].clientY);
    setStartTime(new Date());
    setIsDragging(true);
  };

  // let scale = 1; // Начальное значение масштаба
  // const scaleFactor = 0.005; // Коэффициент масштабирования
  // const minScale = 0.6; // Минимальное значение масштаба
  // const maxScale = 1; // Максимальное значение масштаба

  // function calculateScale(deltaY) {
  //   // Вычисляем изменение масштаба
  //   const scaleChange = deltaY * scaleFactor;

  //   // Обновляем значение масштаба, ограничивая его минимальным и максимальным значениями
  //   scale = Math.max(minScale, Math.min(maxScale, scale - scaleChange));

  //   return scale;
  // }

  // // Пример использования функции
  // // Предположим, что event.deltaY получено из обработчика событий прокрутки или жеста
  // const newScale = calculateScale(event.deltaY);

  const handleTouchMove = (e, index) => {
    if (isDragging) {
      const currentY = e.touches[0].clientY;
      setDeltaY(currentY - startY);

      // requestAnimationFrame(() => {
      slideRefs.current[index].current.style.transform =
        `translateY(${deltaY}px) scale(${Math.max(0.6, Math.min(1, 1 - Math.abs(deltaY) * 0.001))})`;
      backgroundRef.current.style.backgroundColor = `rgba(0, 0, 0, ${Math.max(0, Math.min(1, 1 - Math.abs(deltaY) * 0.002))})`;
      slideRefs.current[index].current.style.transition = `none`;
      backgroundRef.current.style.transition = `none`;
      // });
    }
  };

  const handleTouchEnd = (e, index) => {
    const endTime = new Date();
    const timeDiff = endTime - startTime;

    if (Math.abs(deltaY) > 200 || (timeDiff < 300 && Math.abs(deltaY) > 50)) {
      closeFullscreen();
    }

    // requestAnimationFrame(() => {
    slideRefs.current[index].current.style.transform = `translateY(0)`;
    backgroundRef.current.style.backgroundColor = `rgba(0, 0, 0, 1)`;
    slideRefs.current[index].current.style.transition = `transform 0.3s`;
    backgroundRef.current.style.transition = `background-color 0.3s`;
    setIsDragging(false);
    setDeltaY(0);
    // });
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
                  onTouchMove={(e) => handleTouchMove(e, index)}
                  onTouchEnd={(e) => handleTouchEnd(e, index)}
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
