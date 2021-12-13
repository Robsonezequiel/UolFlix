import styled, { keyframes } from "styled-components";
import { Slide } from "react-slideshow-image";
import { cardBackground, white } from "../../UI/Variables";
import { Display } from "../../UI/General";
import { MdPlayArrow, MdInfoOutline } from "react-icons/md";

export const StyledCarousel = styled(Slide)`
  margin-top: -75px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const EachSlide = styled.div`
  width: 100%;
  position: relative;
`;

export const InnerEachSlide = styled.div`
  width: 100%;
  height: 80vh;
  background-position: center;
  background-size: cover;
`;

export const StyledInnerSlide = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => (props.src ? props.src : "")});
  background-size: cover;
  box-shadow: inset 0 -10rem 5rem -5rem ${cardBackground};
`;

export const StyledBox = styled.div`
  ${props => Display[props.display]};
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  padding-left: 8rem;

  @media screen and (max-width: 425px) and (max-aspect-ratio: 4 / 3) {
    width: 26.563rem;
    height: 14.941rem;
  }

  @media screen and (max-width: 768px) and (max-aspect-ratio: 4 / 3) {
    width: 48rem;
    height: 27rem;
  }
`;

export const NameStyled = styled.div`
  width: 100%;
  height: 100%;
  max-width: 50%;
  max-height: 25%;
  overflow: hidden;
  background-image: ${props =>
    props.src ? `url(${props.src})` : ""}; /* The image used */
  background-position: left bottom;
  background-size: contain;
  background-repeat: no-repeat;

  @media screen and (max-width: 425px) and (max-aspect-ratio: 4 / 3) {
    width: 153px;
    height: auto;
  }

  @media screen and (max-width: 768px) and (max-aspect-ratio: 4 / 3) {
    width: 22rem;
    height: auto;
  }
`;

export const StyledDivP = styled.div`
  max-width: 50%;
  max-height: 25%;
  margin: 1rem 0 2rem;

  @media screen and (max-width: 768px) and (max-aspect-ratio: 4 / 3) {
    width: 17.279rem;
    height: 3.5rem;
  }
`;

export const StyledP = styled.p`
  font-size: 1.469rem;
  font-weight: 400;
  width: 100%;
  margin: 0;
  letter-spacing: -1px;
  line-height: 1.2;
  text-align: left;
  text-shadow: 2px 2px 2px black;
  color: #fff;

  @media screen and (max-width: 425px) and (max-aspect-ratio: 4 / 3) {
    letter-spacing: 0.1px;
    line-height: 0.1;
  }

  @media screen and (max-width: 768px) and (max-aspect-ratio: 4 / 3) {
    font-size: 0.672rem;
    letter-spacing: 0.006rem;
    line-height: 1.5;
    font-weight: bold;
  }
`;

export const StyledPlayButton = styled.button`
  ${props => Display[props.display]};
  font-size: 1.2rem;
  font-weight: bold;
  width: 10rem;
  margin-right: 1rem;
  padding: 0.4rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  background-color: white;
  color: black;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }

  @media screen and (min-width: 768px) and (max-aspect-ratio: 4 / 3) {
    font-size: 1rem;
    width: 7.696rem;
    height: 2.3rem;
    padding: 0.1rem 0.4rem;
  }
`;

export const StyledPlayIcon = styled(MdPlayArrow)`
  font-size: 2rem;

  @media screen and (min-width: 768px) and (max-aspect-ratio: 4 / 3) {
    font-size: 1.5rem;
  }
`;

const moveArrow = isLeftArrow => keyframes`
  25% {
    transform: translateX(0);
  }

  50% {
    transform: ${isLeftArrow ? "translateX(-200%)" : "translateX(200%)"}
  }

  50.1% {
    transform: ${isLeftArrow ? "translateX(200%)" : "translateX(-200%)"}
  }

  75% {
    transform: translateX(0);
  }
`;

const hideArrow = keyframes`
  25% {
    top: 0;
    transform: rotate(0deg);
  };

  75% {
    top: 0;
    transform: rotate(0deg);
  }
`;

export const StyledArrowBody = styled.div`
  ${props => Display[props.display]};
  position: absolute;
  right: ${props => (props.isLeftArrow ? "" : "2rem")};
  left: ${props => (props.isLeftArrow ? "2rem" : "")};
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;

  .animate {
    animation: ${props => moveArrow(props.isLeftArrow)} 0.6s linear;

    ::before,
    ::after {
      animation: ${hideArrow} 0.6s linear;
    }
  }
`;

export const StyledArrow = styled.div`
  position: relative;
  width: 90%;
  height: 0.25rem;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  background-color: ${white};

  &::before,
  &::after {
    content: "";
    z-index: 1;
    position: absolute;
    width: 60%;
    height: inherit;
    right: ${props => (props.isLeftArrow ? "" : "0")};
    left: ${props => (props.isLeftArrow ? "0" : "")};
    transition: all 0.4s;
    background-color: inherit;
  }

  &::before {
    top: -0.05rem;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    transform-origin: ${props =>
      props.isLeftArrow ? "top left" : "top right"};
    transform: ${props =>
      props.isLeftArrow ? "rotate(45deg)" : "rotate(-45deg)"};
  }

  &::after {
    top: 0.05rem;
    transform-origin: ${props =>
      props.isLeftArrow ? "bottom left" : "bottom right"};
    transform: ${props =>
      props.isLeftArrow ? "rotate(-45deg)" : "rotate(45deg)"};
  }
`;

export const StyledDiv = styled.div`
  ${props => Display[props.display]};
`;

export const StyledInfoButton = styled(StyledPlayButton)`
  margin-right: 0;
  width: initial;
  background-color: rgba(109, 109, 110, 0.7);
  color: ${white};

  &:hover {
    opacity: 1;
    background-color: rgba(109, 109, 110, 0.6);
  }
`;

export const StyledInfoIcon = styled(MdInfoOutline)`
  font-size: 2rem;
  margin: 0 0.5rem 0 0;

  @media screen and (min-width: 768px) and (max-aspect-ratio: 4 / 3) {
    font-size: 1.5rem;
  }
`;
