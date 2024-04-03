import styled from "styled-components";
import { ReactComponent as chevroneSVG } from "../../../../assets/chevrone.svg";
import { ReactComponent as trashSVG } from "../../../../assets/trash.svg";

export const FullscreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 1);
  z-index: 99;
  overflow-y: scroll;
  scrollbar-width: none; /* Скрывает скроллбары */
  -ms-overflow-style: none; /* Скрывает скроллбары */

  &::-webkit-scrollbar {
    display: none; /* Скрывает скроллбары */
  }

  .delete-button {
    width: 36px;
    height: 36px;
    bottom: 16px;
    background-color: transparent;

    img {
      width: 20px;
      height: 20px;
    }
  }

  .slick-slide {
    display: flex !important;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
`;

export const FullscreenSlide = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 100vw;
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border: none;
  outline: none;

  & > img,
  & > video {
    width: 100%;
    height: 100vh;
    object-fit: contain;
    object-position: center;
    border-radius: 0;
  }
`;

export const FullscreenHeader = styled.div`
  padding: 18px 24px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 5;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  opacity: ${(props) => (props.isHeaderShow ? "1" : "0")};

  transition: opacity 0.4s;

  & > div {
    flex: 1;
  }
`;

export const TrashWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg {
    width: 20px;
    height: 20px;
    path {
      fill: #ffffff;
    }
  }
`;

export const TrashIcon = styled(trashSVG)`
  width: 24px;
  height: 24px;
`;

export const BackButtonWrapper = styled.div``;

export const BackButton = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #fff;
`;

export const ArrowLeftIcon = styled(chevroneSVG)`
  transform: rotate(90deg);
  path {
    fill: #fff;
  }
`;

export const FilesCounter = styled.div`
  text-align: center;
`;
