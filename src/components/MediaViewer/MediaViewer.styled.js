import styled from "styled-components";
import { ReactComponent as trashSVG } from "../../assets/trash.svg";

export const ViewerWrapper = styled.div`
  height: 268px;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    width: fit-content;
    max-width: 90%;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    border-radius: 8px;
    /* overflow: hidden; */
  }

  & img,
  & video {
    position: relative;
    max-width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    z-index: 1;
  }
`;

export const MediaSlide = styled.div`
  position: relative;
  height: 100%;
`;

export const DeleteButton = styled.div`
  padding: 4px;
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 4px;
  z-index: 10;
  will-change: transform;
`;

export const TrashIcon = styled(trashSVG)`
  width: 16px;
  height: 16px;
`;

export const VideoLabel = styled.div`
  padding: 4px;
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: #fff;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  line-height: 12px;
  color: #697180;
  z-index: 10;
  will-change: transform;
`;
