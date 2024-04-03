import styled from "styled-components";
import { pauseSVG, playSVG } from "../../../../assets";

export const VideoSlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  video {
    height: 100%;
    object-fit: contain;
    border-radius: 0;
  }
`;

export const ControlsWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
`;

export const ControlButton = styled.div`
  padding: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  line-height: 12px;
  color: #697180;
`;

export const CustomPlayer = styled.div`
  padding: 12px 24px 48px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99999;
`;

export const PlayIcon = styled.img.attrs({ src: playSVG })`
  width: 16px;
  height: 16px;
`;

export const PauseIcon = styled.img.attrs({ src: pauseSVG })`
  width: 16px;
  height: 16px;
`;
