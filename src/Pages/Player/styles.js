import styled from "styled-components";
import ReactPlayer from "react-player";
import { BiArrowBack } from "react-icons/bi";

export const StyledPlayer = styled(ReactPlayer)`
  position: fixed;
  min-width: 100%;
  min-height: 100%;

  
`;

export const StyledIcon = styled(BiArrowBack)`
  z-index: 1;
  position: absolute;
  top: 70px;
  left: 30px;
  color: white;
  font-size: 2em;
  transition: all 0.4s;
  background: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    font-size: 2rem;
    transform: scale(1.2);
  }
`;

export const StyledBack = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;

  @media (max-width: 425px){
    transform: rotate(-90deg);
    top: 117vh;
    transform-origin: left top; 
    min-width:400px;
    min-height: 430px;
    position: absolute; 
  } 
  @media (max-width: 320px){
    top: 119vh;
    min-width: 480px;
    min-height: 380px;

  }
`;
