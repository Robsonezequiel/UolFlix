import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { white } from "../../../UI/Variables";
import { MdCreate, MdDeleteForever, MdPlayArrow } from "react-icons/md";
import { StyledGrid } from "../styles";
import { Display } from "../../../UI/General";

export const StyledDiv = styled.div`
  ${props => Display[props.display]};
`;

export const StyledLink = styled(Link)`
  position: relative;
  width: 100%;

  :hover {
    svg {
      display: block;
    }

    ::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /* box-shadow: inset 0 0 2rem black; */
    }
  }
`;

export const StyledPlayIcon = styled(MdPlayArrow)`
  font-size: 3rem;
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.75);
  color: ${white};
`;

export const StyledVideo = styled(StyledGrid)`
  position: relative;

  @media (max-width: 768px) {
    /* reset */
    grid-template-columns: initial;
    grid-template-rows: initial;
    grid-gap: initial;
    row-gap: initial;
    column-gap: initial;
    /* new */
    display: flex;
    flex-direction: column;
  }
`;

export const StyledVideoInfo = styled.div`
  ${props => Display[props.display]};
  position: relative;
`;

export const StyledArea = styled.div`
  ${props => Display[props.display]};

  @media (max-width: 425px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: ${props=> props.alignReset ? "flex-start" : ""};
  }
`;

export const StyledInfoArea = styled(StyledGrid)`
  @media (max-width: 425px) {
    /* reset */
    grid-template-columns: initial;
    grid-template-rows: initial;
    grid-gap: initial;
    row-gap: initial;
    column-gap: initial;
    /* new */
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledImg = styled.div`
  background-image: ${props => (props.src ? `url(${props.src})` : "")};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0.25rem;
  width: 100%;
  height: 10rem;
  overflow: hidden;

  /* @media (max-width: 1440px) {
    height: 10rem;
    
  }

  @media (max-width: 1024px) {
    height: 10rem;
  } */

  @media (max-width: 768px) {
    height: 20rem;
    width: 100%;
  }

  @media (max-width: 425px) {
    height: 10rem;
    width: 100%;
  }
`;

export const StyledTitle = styled.p`
  font-size: 1.5em;
  margin: 0;
  padding: 0;
  color: ${white};

  @media (max-width: 375px){
    font-size: 1.3em;
  }
`;

export const StyledText = styled.p`
  font-size: ${props => (props.fontSize ? props.fontSize : "1.25em")};
  margin: ${props => (props.margin ? props.margin : "0")};
  padding: 0;
  text-align: ${props => (props.align ? props.align : "")};
  color: ${props => (props.color ? props.color : white)};

  @media (max-width: 425px) {
    text-align: left;
  }
`;

export const StyledButtonIconArea = styled.div`
  ${props => Display[props.display]};

  @media (max-width: 425px) {
    justify-content: flex-start;
    width: 100%;
    /* margin: 1rem 0; */
  }
`;

export const StyledButtonIcon = styled.button`
  ${props => Display[props.display]};
  font-size: 1.25rem;
  margin: 0;
  padding: 1rem 0 1rem 1rem;
  border: none;
  border-radius: 0.25rem;
  transition: all 0.4s;
  background: transparent;

  :hover {
    font-size: 2rem;
    transform: scale(1.05);
  }
`;

const Icon = css`
  color: ${white};
`;

export const StyledEditIcon = styled(MdCreate)`
  ${Icon};
`;

export const StyledDeleteIcon = styled(MdDeleteForever)`
  ${Icon};
`;

export const StyledLine = styled.hr`
  margin: 2rem 0;
  color: ${white};
`;

export const StyledCategory = styled.div`
  background-color: #228b22;
  width: 100%;
  max-width: 4rem;
  border: none;
  border-radius: 0.1rem;
  color: white;
  height: 1.3rem;
  font-size: 0.65rem;
  padding: 0.2rem;
  text-align: center;
  margin-bottom: 0.5rem;

  @media (max-width: 425px) {
    margin-left: 0;
    margin-top: 0.5rem;
  } ;
`;
