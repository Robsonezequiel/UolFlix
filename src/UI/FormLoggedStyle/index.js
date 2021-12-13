import styled from "styled-components";
import { Form } from "@unform/web";
import { textLightGray, cardBackground, white } from "../Variables";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import { Display } from "../General";

export const ProfileForm = styled(Form)`
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 6rem;
  padding: 0rem;
  color: ${textLightGray};

  @media (max-width: 500px) {
    padding: 1rem;
  }

  @media (min-width: 501px) and (max-width: 739px) {
    padding: 2rem;
  }

  @media (min-width: 740px) {
    padding: 60px 60px 40px;
    max-width: 75%;
  }

  p {
    color: white;
  }
`;

export const StyledProfileGroup = styled.div`
  position: relative;
  margin: 1rem 0;
  padding-right: 0.5rem;
  width: 100%;
`;

export const StyledStepperGroup = styled.div`
  position: relative;
  margin: 5rem 0 3rem;
  width: 100%;

  @media (max-width: 768px) {
    margin: 3rem 0;
    font-size: 0.9rem;
  }

  @media (max-width: 425px) {
    margin: 2rem 0 3rem;
    font-size: 0.9rem;
  }

  @media (max-width: 320px) {
    display: none;
  }
`;

export const FlexDiv = styled.div`
  ${props => Display[props.display]};
  color: ${props => (props.color ? props.color : "")};

  @media (max-width: 500px) {
    display: block;
  }
`;

export const FlexDivResponsive = styled(FlexDiv)`
  @media (max-width: 500px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: ${props => (props.columns ? props.columns : "")};
    row-gap: ${props => (props.column_gap ? props.column_gap : "")};
  }
`;

export const StyledBackGround = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: static;
  padding-bottom: 30px;
  right: 0;
  left: 0;
  background-color: ${cardBackground};
`;

export const Textarea = styled.input`
  font-size: 1rem;
  position: relative;
  width: 100%;
  min-height: 200px;
  border: none;
  border-radius: 0.25rem;
  outline: 0;
  padding: 1.25rem 1.25rem 0.75rem;
  background: #333;
  color: ${white};
  text-align: center;
`;

export const StyledSelect = styled.select`
  font-size: 1rem;
  position: relative;
  width: 100%;
  border: none;
  border-radius: 0.25rem;
  outline: 0;
  padding: 1.25rem 1.25rem 0.75rem;
  background: #333;
  color: white;
  text-align: left;

  @media (max-width: 425px) {
    font-size: 0.9rem;
  }
`;

export const StyledDate = styled(Datetime)`
  input {
    border: none;
    border-radius: 0.25rem;
    background: #333;
    color: white;
    font-size: 1rem;
    position: relative;
    width: 100%;
    outline: 0;
    padding: 1.25rem 1.25rem 0.75rem;

    /**
     * gambiarra para não surgir os cantos acinzentados
     * disponível em:
     * https://stackoverflow.com/questions/34507199/chromes-autofill-leaves-greyish-corners-on-rounded-input-fields
     */
    transition: background-color 2147483647s, color 2147483647s,
      caret-color 2147483647s;
  }
`;

export const AvatarDiv = styled.div`
  position: relative;
  background-image: ${props => (props.src ? `url(${props.src})` : "")};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 143px;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0.25rem;
`;
