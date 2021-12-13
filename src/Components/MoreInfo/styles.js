import styled from "styled-components";
import { Link } from "react-router-dom";
import { Display } from "../../UI/General";
import { cardBackground, white } from "../../UI/Variables";
import { MdClose } from "react-icons/md";
import { StyledPlayButton as OldPlayButton } from "../Carousel/styles";

export const StyledLightBox = styled.div`
  &::before {
    content: "";
    z-index: 12;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: default;
    background: rgba(0, 0, 0, 0.75);
  }
`;

export const StyledContainer = styled.div`
  z-index: 12;
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  max-width: 850px;
  min-width: 850px;
  /* width: 80%; */
  overflow: hidden;
  border-radius: 0.5rem;
  background: ${cardBackground};
`;

export const StyledContent = styled.div`
  ${props => Display[props.display]};
  padding: 0.5rem 3rem 3rem;
  // 25rem = banner size
  // 2rem = margin top
  // 1rem = margin bottom
  max-height: calc(100vh - 20rem - 2rem - 1rem);
  overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const StyledDiv = styled.div`
  ${props => Display[props.display]};
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const StyledBanner = styled.div`
  position: relative;
  margin: 0 auto;
  height: 20rem;
  overflow: hidden;
  background-image: ${props =>
    props.src ? `url(${props.src})` : ""}; /* The image used */
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: inset 0 -10rem 5rem -5rem ${cardBackground};

  @media (max-width: 425px) {
    width: 100%;
    height: 10rem;
  }

  @media (max-width: 425px) {
    width: 100%;
    height: 7rem;
  }
`;

export const StyledText = styled.p`
  font-size: ${props => (props.size ? props.size : "1.1rem")};
  font-weight: ${props => (props.bold ? "bold" : "")};
  margin: 0.5rem 0;
  color: ${props => (props.color ? props.color : white)};
`;

export const StyledCloseButton = styled.div`
  z-index: 1;
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem;
  border-radius: 50%;
  background: ${cardBackground};

  &:hover {
    cursor: pointer;
  }
`;

export const StyledCloseIcon = styled(MdClose)`
  font-size: 1.75rem;
  color: ${white};
`;

export const StyledPlayButton = styled(OldPlayButton)`
  position: absolute;
  bottom: 3rem;
  left: 3rem;
`;
