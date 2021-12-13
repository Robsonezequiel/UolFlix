import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { MdDone } from "react-icons/md";
import { linkBlue, white } from "../../UI/Variables";
import { Display } from "../../UI/General";

export const StyledFlex = styled.div`
  ${props => Display[props.display]};
  margin: ${props => (props.margin ? props.margin : "")};

  @media (max-width: 425px) {
    display: ${props => (props.no_media ? "" : "block")};
  } ;
`;

const scale = keyframes`
  0% {
    transform: scale(0);
  };

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(0);
  }
`;

export const StyledCircle = styled.div`
  margin: 1rem 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: white;
  animation: ${scale} 2s ease-in-out infinite;

  :nth-child(1) {
    animation-delay: 0.25s;
  }

  :nth-child(2) {
    animation-delay: 0.5s;
  }

  :nth-child(3) {
    animation-delay: 0.75s;
  }

  :nth-child(4) {
    animation-delay: 1s;
  }
`;

export const StyledDoneIcon = styled(MdDone)`
  font-size: 4rem;
  color: ${white};
`;

export const StyledText = styled.p`
  font-size: ${props => (props.fontSize ? props.fontSize : "1.25em")};
  margin: ${props => (props.margin ? props.margin : "0")};
  padding: 0;
  text-align: ${props => (props.align ? props.align : "")};
  color: ${props => (props.color ? props.color : white)};
`;

export const StyledLink = styled(Link)`
  font-size: 1.25rem;
  border: none;
  text-decoration: none;
  color: ${linkBlue};

  :hover {
    opacity: 0.9;
  }
`;
