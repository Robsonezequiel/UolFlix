import styled from "styled-components";
import { Display } from "../../../UI/General";
import { black, red, textLightGray, white, cardBackground } from "../../../UI/Variables";
import { StyledGrid } from "../styles";

export const StyledDiv = styled.div`
  ${props => Display[props.display]};
  border-radius: 0.5rem;
  background: ${white};

  ::before {
    content: "";
    pointer-events: none;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
  }
`;

export const StyledTextArea = styled.div`
  ${props => Display[props.display]};
  padding: 2rem;
`;

export const StyledText = styled.p`
  font-size: 1.25rem;
  margin: 0;
  color: ${cardBackground};
`;

export const StyledHelper = styled.p`
  font-size: 0.9rem;
  margin-top: 0.5rem;
  color: ${textLightGray};
`;

export const StyledVideoTitle = styled.strong`
  color: ${red};
`;

export const StyledButtonArea = styled(StyledGrid)`
  width: 100%;
`;

export const StyledButton = styled.button`
  font-size: 1.2rem;
  padding: 0 1rem 1rem 1rem;
  transition: all 0.1s;
  border: none;
  background: transparent;
  color: ${props => (props.color ? props.color : "")};

  :hover {
    opacity: 0.7;
  }

  :last-child {
    border-right: none;
  }
`;
