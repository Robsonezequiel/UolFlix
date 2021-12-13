import styled, { css } from "styled-components";
import { Form } from "@unform/web";
import { Link } from "react-router-dom";
import {
  textLightGray,
  textDarkGray,
  linkGray,
  errorOrange,
  linkBlue,
  black,
  white,
} from "../Variables";
import { Display } from "../General";

const flex = css`
  display: flex;
  align-items: center;
`;

const FormContainerMinHeight = {
  Auth: css`
    min-height: 320px;
  `,

  Register: css`
    min-height: 490px;
  `,

  Recover: css`
    min-height: 315px;
  `,

  Token: css`
    min-height: 255px;
  `,

  Reset: css`
    min-height: 250px;
  `,
};

export const StyledForm = styled(Form)`
  margin: 0 auto;
  padding: 4rem;
  min-height: 80vh;
  border-radius: 0.25rem;
  background-color: rgba(0, 0, 0, 0.75);
  color: ${textLightGray};

  @media (max-width: 500px) {
    padding: 1rem;
  }

  @media (min-width: 501px) and (max-width: 739px) {
    padding: 2rem;
  }

  @media (min-width: 740px) {
    margin-bottom: 90px;
    padding: 60px 68px 40px;
    max-width: 450px;
  }
`;

export const StyledFormContainer = styled.div`
  ${props =>
    props.dataStyleType
      ? FormContainerMinHeight[props.dataStyleType]
      : "320px"};
`;

export const StyledTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  padding: 0;
  margin-bottom: ${props => (props.marginFormTitle ? "3rem" : "28px")};
  color: ${white};
`;

export const StyledWrongApi = styled.div`
  font-size: 0.9rem;
  display: ${props => (props.display ? "block" : "none")};
  padding: 0.625rem 1.25rem;
  border-radius: 0.25rem;
  background: ${errorOrange};
  color: ${white};
`;

export const StyledGroup = styled.div`
  position: relative;
  margin: ${props => (props.margin ? props.margin : "1rem 0")};
`;

export const StyledTokenContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export const StyledInputGroup = styled.div`
  display: ${props => (props.flex ? "flex" : "")};
  position: relative;
  width: 100%;

  &::before {
    content: "";
    display: ${props => (props.error ? "block" : "none")};
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border-bottom: 2px solid ${errorOrange};
    border-radius: 0.25rem;
  }

  &::after {
    content: "";
    display: ${props => (props.disabled ? "" : "none")};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.25rem;
    background: rgba(0, 0, 0, 0.25);
  }
`;

export const StyledInput = styled.input`
  font-size: 1rem;
  position: relative;
  width: 100%;
  border: none;
  border-radius: 0.25rem;
  outline: 0;
  padding: 1.25rem 1.25rem 0.75rem;
  overflow: hidden;
  background: #333;
  color: ${white};
  border-top-right-radius: ${props =>
    props.changeBorderOnButtonActive ? "0" : ""};
  border-bottom-right-radius: ${props =>
    props.changeBorderOnButtonActive ? "0" : ""};

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    font-size: 0.75rem;
    padding: 0.25rem 1.25rem;
  }

  &:focus {
    border-top-right-radius: ${props => (props.changeBorderOnFocus ? "0" : "")};
    border-bottom-right-radius: ${props =>
      props.changeBorderOnFocus ? "0" : ""};
  }

  &:focus ~ button,
  &:not(:focus) ~ button:active {
    display: inline-block;
  }

  &[type="text"],
  &[type="tel"] {
    /**
     * gambiarra para não surgir os cantos acinzentados
     * disponível em:
     * https://stackoverflow.com/questions/34507199/chromes-autofill-leaves-greyish-corners-on-rounded-input-fields
     */
    transition: background-color 2147483647s, color 2147483647s,
      caret-color 2147483647s;
  }

  &[type="password"] {
    ::-ms-reveal {
      display: none;
    }
  }

  &[type="date"] {
    ::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
  }
`;

export const StyledInputToken = styled(StyledInput)`
  padding: 1.25rem 0 0.75rem;
  text-align: center;
  background: transparent;

  :focus ~ label,
  :not(:placeholder-shown) ~ label {
    font-size: inherit;
    padding: 0.25rem 0.5rem;
  }
`;

export const StyledSelect = styled.select`
  font-size: 1rem;
  width: 100%;
  outline: 0;
  padding: ${props =>
    props.isActive ? "1.25rem 1.25rem 0.75rem" : "1rem 1.25rem"};
  border: none;
  border-radius: 0.25rem;
  background: #333;
  color: ${white};

  @media (max-width: 425px) {
    font-size: 0.9rem;
  }
`;

export const StyledSelectArrow = styled.div`
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 3rem;
    height: 100%;
    pointer-events: none;
    border-radius: 0.25rem;
    background: #333;
  }

  &::after {
    content: "";
    position: absolute;
    top: ${props =>
      props.isOpened ? "" : props.isActive ? "calc(50% + 0.25rem)" : "50%"};
    bottom: ${props => (props.isOpened ? "calc(37.5% - 0.25rem)" : "")};
    right: calc(1.5rem - 0.375rem); // half size of before - size of border
    border: 0.375rem solid blue;
    border-color: ${props =>
      props.isOpened
        ? `transparent transparent  ${white} transparent`
        : ` ${white} transparent transparent transparent`};
    /* transition: all 5s; */
  }
`;

export const StyledTextArea = styled.textarea`
  font-size: 1rem;
  display: block;
  position: relative;
  width: 100%;
  border: none;
  border-radius: 0.25rem;
  outline: 0;
  padding: 1.25rem 1.25rem 0.75rem;
  background: #333;
  color: ${white};
  border-top-right-radius: ${props =>
    props.changeBorderOnButtonActive ? "0" : ""};
  border-bottom-right-radius: ${props =>
    props.changeBorderOnButtonActive ? "0" : ""};
  resize: ${props => (props.resize ? props.resize : "")};

  :focus ~ label,
  :not(:placeholder-shown) ~ label {
    font-size: 0.75rem;
    padding: 0.25rem 1.25rem;
    width: calc(100% - 20px);
    background: #333;
  }

  :focus {
    border-top-right-radius: ${props => (props.changeBorderOnFocus ? "0" : "")};
    border-bottom-right-radius: ${props =>
      props.changeBorderOnFocus ? "0" : ""};
  }

  :focus ~ button,
  :not(:focus) ~ button:active {
    display: inline-block;
  }

  &[type="password"] {
    ::-ms-reveal {
      display: none;
    }
  }
`;

export const StyledPlaceholder = styled.label`
  font-size: ${props => (props.isActive ? "0.75rem" : "1rem")};
  position: absolute;
  top: 0;
  left: 0;
  padding: ${props => (props.isActive ? "0.25rem 1.25rem" : "1rem 1.25rem")};
  pointer-events: none;
  border-top-left-radius: 0.25rem;
  transition: all 0.3s;
  color: inherit;

  @media (max-width: 425px) {
    font-size: 0.9rem;
  }
`;

export const StyledTokenPlaceholder = styled(StyledPlaceholder)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 0.5rem 0.5rem;

  ::before {
    content: "";
    background: ${props => (props.error ? errorOrange : textLightGray)};
    width: 100%;
    height: 0.1rem;
    border-radius: 0.25rem;
  }
`;

export const StyledDatePlaceholder = styled(StyledPlaceholder)`
  font-size: ${props => (props.focused ? "0.75rem" : "")};
  padding: ${props => (props.focused ? "0.25rem 1.25rem" : "")};
`;

export const StyledButtonPasswordReveal = styled.button`
  font-size: 0.9rem;
  display: ${props => (props.teste ? props.teste : "none")};
  padding-right: 1.25rem;
  border: none;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  background: #333;
  color: inherit;
`;

export const StyledContainerWrong = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 3px;
`;

export const StyledWrong = styled.span`
  font-size: 0.85rem;
  color: ${errorOrange};
`;

export const StyledHelper = styled.div`
  ${flex};
  justify-content: ${props =>
    props.justify ? props.justify : "space-between"};
`;

export const CheckboxContainer = styled.label`
  ${flex};
  margin: ${props => (props.margin ? props.margin : "")};
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

export const StyledCheckbox = styled.div`
  ${flex};
  justify-content: center;
  position: relative;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 0.25rem;
  background: ${textDarkGray};
  /* color: #b3b3b3; */

  ::before {
    content: "✓";
    font-weight: bold;
    visibility: ${props => (props.checked ? "visible" : "hidden")};
    color: ${black};
  }
`;

export const StyledCheckboxTitle = styled.span`
  font-size: ${props => (props.size ? props.size : "0.85rem")};
  margin-left: 0.25rem;
  user-select: none;
`;

export const StyledLink = styled(Link)`
  font-size: ${props => (props.size ? props.size : "0.85rem")};
  text-decoration: ${props => (props.underline ? props.underline : "none")};
  color: ${props => (props.color ? props.color : linkGray)};
  margin-left: ${props => (props.marginleft ? props.marginleft : "")};

  :hover {
    text-decoration: underline;
    color: ${props => (props.color ? props.color : linkGray)};
  }
`;

export const StyledFacebook = styled.div`
  ${flex};
  margin: 1rem 0 0;
  user-select: none;
`;

export const StyledFacebookImg = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

export const StyledFacebookTitle = styled.div`
  font-size: 0.9rem;
  margin-left: 0.5rem;
  color: ${textDarkGray};
`;

export const StyledSignUpArea = styled.div`
  ${flex};
  margin: 0.75rem 0;
  color: ${textDarkGray};
`;

export const StyledTerms = styled.div`
  margin-top: 20px;
  font-size: 0.85rem;
  line-height: 1.1;
  color: ${textLightGray};
`;

export const StyledKnowMoreButton = styled.button`
  display: ${props => (props.knowMore ? "none" : "")};
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  color: ${linkBlue};

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledKnowMore = styled.div`
  margin: 1rem 0 0;
  visibility: ${props => (props.knowMore ? "visible" : "hidden")};
`;

export const StyledDiv = styled.div`
  ${props => Display[props.display]};
`;
