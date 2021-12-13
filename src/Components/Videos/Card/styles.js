import styled from "styled-components";
import { Link } from "react-router-dom";
import { Display } from "../../../UI/General";
import { MdInfo } from "react-icons/md";
import { black, cardBackground, white } from "../../../UI/Variables";

export const StyledCard = styled.div`
  display: inline-block;
  position: relative;
  border: none;
  width: 100%;
  height: 9rem;
  margin-top: 0;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.3s, padding 0s;

  @media (max-width: 768px) {
    height: 8rem;
  }

  @media (max-width: 425px) {
    height: 7rem;
  }

  @media (max-width: 375px) {
    height: 6rem;
  }

  @media (max-width: 320px) {
    height: 5rem;
  }

  &:hover {
    z-index: 5;
    padding: 0;
    transform: scale(1.25);
    transform-origin: center;
    box-shadow: 0px 0px 2rem 0.5rem ${black};

    > svg {
      display: inline-block;
    }

    > a div {
      width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      > svg {
        display: inline-block;
      }
    }

    > a div.info {
      display: block;
      top: 100%;
      opacity: 1;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      box-shadow: 0px 0px 2rem 0.5rem ${black};
    }
  }
`;

export const StyledCardLink = styled(Link)`
  justify-self: ${props => (props.justify_self ? props.justify_self : "")};
  width: 100%;
  text-decoration: none;
  transition: all 0.3s;
`;

export const StyledCardImg = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.25rem;
  background-image: ${props => (props.src ? `url(${props.src})` : "")};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const StyledCardContainer = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  width: 100%;
  padding: 0.75rem 0.75rem 1rem;
  transition: all 0.2s;
  background: ${cardBackground};
  border-radius: 0.25rem;
  opacity: 0;
`;

export const StyledCardContent = styled.div`
  font-size: 1rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 0.25rem;

  @media (max-width: 1399px) {
    color: red;
  }

  @media (max-width: 1099px) {
    font-size: 0.9rem;
  }

  @media (max-width: 799px) {
    font-size: 0.8rem;
  }

  @media (max-width: 499px) {
    font-size: 0.7rem;
  }
`;

export const StyledCardTitle = styled.p`
  justify-self: ${props => (props.alignright ? "end" : "")};
  font-size: 1.2em;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${white};
`;

export const StyledCardIconArea = styled.div`
  ${props => Display[props.display]};
`;

export const StyledCardIcon = styled(MdInfo)`
  font-size: 1.5em;
  border-radius: 50%;
  color: ${white};

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

export const StyledCardText = styled.p`
  justify-self: ${props => (props.align_right ? "end" : "")};
  font-size: 0.8em;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => (props.color ? props.color : white)};
`;
