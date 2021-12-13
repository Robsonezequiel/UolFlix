import styled, { css } from "styled-components";
import { white } from "../../../UI/Variables";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export const StyledTitle = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 2rem 0 0.75rem 0;
  padding: 0 calc(4% + 0.25rem);
  color: ${white};
`;

export const StyledContainer = styled.div`
  position: relative;
`;

export const StyledContent = styled.div`
  white-space: nowrap;
  margin-bottom: 50px;
  transform: ${props =>
    props.translateX ? `translateX(${props.translateX})` : ""};
  transition: transform 0.5s;

  @media (max-width: 768px) {
    overflow: scroll;
  }
`;

const PrevNext = css`
  display: ${props => (props.hide ? "none" : "flex")};
  justify-content: ${props => (props.hide ? "" : "center")};
  align-items: ${props => (props.hide ? "" : "center")};
  z-index: 5;
  position: absolute;
  top: 0;
  width: 4%;
  height: 9rem;
  background: rgba(20, 20, 20, 0.5);
  color: transparent;

  &:hover {
    background: rgba(20, 20, 20, 0.7);
    color: ${white};
    cursor: pointer;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledPrev = styled(MdNavigateBefore)`
  ${PrevNext};
  left: 0;
`;

export const StyledNext = styled(MdNavigateNext)`
  ${PrevNext};
  right: 0;
`;

export const StyledTeste = styled.div`
  padding: "0 4%";
`;
