import styled from "styled-components";
import { Display } from "../UI/General";

export const Body = styled.div`
  ${props => Display[props.display]};
  min-height: 100vh;
`;
