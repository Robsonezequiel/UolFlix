import styled, { css } from "styled-components";
import { red, white } from "../../UI/Variables";

const BtnStyle = {
  Home: css`
    height: 34px;
    align-items: center;
    width: 77.58px;
    border: none;
    border-radius: 3px;
    line-height: normal;
    font-weight: 400;
    @media (max-width: 550px) {
      font-size: 0.9rem;
      padding: 0.25rem 0.5rem;
    }
  `,

  Auth: css`
    height: 48px;
    width: ${props => (props.width ? props.width : "100%")};
    line-height: 16px;
    border: none;
    border-radius: 4px;
    margin: 24px 0 12px;
    padding: 0.4rem 1.3rem;
    line-height: 16px;
    font-weight: bold;
  `,

  Steps: css`
    width: 150px;
    height: 35px;
    border: none;
    border-radius: 3px;
    /* margin: 24px 10px 12px 0px; */
    margin: ${props => (props.margin ? props.margin : "")};

    @media (max-width: 425px) {
      font-size: 0.9rem;
      width: 100%;
    }
  `,
};

const StyledButton = styled.button`
  background-color: ${props => (props.background ? props.background : red)};
  color: ${white};
  font-size: 1rem;
  ${props => BtnStyle[props.dataStyleType]};
  display: ${props => (props.hide ? "none" : "block")};
`;

export default StyledButton;
