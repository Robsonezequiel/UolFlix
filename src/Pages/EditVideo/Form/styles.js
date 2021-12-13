import styled from "styled-components";
import { Form } from "@unform/web";
import { StyledGrid } from "../styles";
import { red, textLightGray, white } from "../../../UI/Variables";
import { Display } from "../../../UI/General";

export const StyledDiv = styled.div`
  ${props => Display[props.display]};
`;

export const StyledForm = styled(Form)`
  color: ${textLightGray};

  p {
    color: ${white};
  }
`;

export const StyledButtonArea = styled.div`
  ${props => Display[props.display]};

  @media (max-width: 500px) {
    display: ${props => (props.blockOnMobile ? "block" : "")};
  }
`;

export const StyledButton = styled.button`
  padding: 0.5rem 2rem;
  border: none;
  border-radius: 0.25rem;
  background: ${props => (props.background ? props.background : red)};
  color: ${props => (props.color ? props.color : white)};
`;

export const StyledGridBottom = styled(StyledGrid)`
  @media (max-width: 425px) {
    grid-template-columns: initial;
    grid-column-gap: initial;
    grid-template-rows: auto;
  }
`;
