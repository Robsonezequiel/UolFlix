import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { MdVideocamOff } from "react-icons/md";
import { cardBackground, linkBlue, red, white } from "../../UI/Variables";
import { Display } from "../../UI/General";

export const StyledBody = styled.div`
  ${props => Display[props.display]};
  position: relative;
  background: ${cardBackground};
  color: ${white};
`;

export const StyledContainer = styled.div`
  ${props => Display[props.display]};
  margin: 2rem 0;
`;

export const StyledContent = styled.div`
  width: 75%;
  padding: ${props => (props.formPadding ? "0 60px 40px" : "")};

  @media (max-width: 1024px) {
    padding: 0;
  }

  @media (max-width: 768px) {
    width: 80%;
    padding: 0;
  }
`;

export const StyledTitleArea = styled.div`
  ${props => Display[props.display]};
  width: 100%;
`;

export const StyledTitle = styled.p`
  font-size: 3rem;
  color: ${white};
`;

export const StyledNoVideo = styled.div`
  ${props => Display[props.display]};
  height: calc(80vh - 75px);
`;

export const StyledVideoIcon = styled(MdVideocamOff)`
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

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.columns ? props.columns : "")};
  grid-template-rows: ${props => (props.rows ? props.rows : "")};
  grid-gap: ${props => (props.gap ? props.gap : "")};
  row-gap: ${props => (props.rowGap ? props.rowGap : "")};
  column-gap: ${props => (props.columnGap ? props.columnGap : "")};
`;
