import React, { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import {
  StyledInputGroup,
  StyledInput,
  StyledPlaceholder,
  StyledButtonPasswordReveal,
  StyledContainerWrong,
  StyledWrong,
} from "../../../UI/FormStyle";

const Input = ({
  type,
  name,
  placeholder,
  forwardedRef,
  defaultValue,
  disabled,
  ...rest
}) => {
  const inputRef = forwardedRef ? forwardedRef : useRef(null);
  const { fieldName, registerField, error } = useField(name);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  const handleClickPasswordReveal = () => {
    inputRef.current.type =
      inputRef.current.type === "password" ? "text" : "password";
    inputRef.current.focus();
    setIsPasswordVisible(isPasswordVisible => !isPasswordVisible);
  };

  const handleMouseDownButton = () => {
    setIsButtonPressed(true);
  };

  const handleMouseUpButton = () => {
    setIsButtonPressed(false);
  };

  return (
    <>
      <StyledInputGroup
        error={error}
        flex={type === "password"}
        disabled={disabled ? 1 : 0}
      >
        <StyledInput
          changeBorderOnFocus={type === "password" ? 1 : 0}
          changeBorderOnButtonActive={isButtonPressed}
          type={type ? type : "text"}
          name={name}
          ref={inputRef}
          defaultValue={defaultValue}
          placeholder=" "
          disabled={disabled ? 1 : 0}
          {...rest}
        />
        <StyledPlaceholder>{placeholder}</StyledPlaceholder>
        {type === "password" && (
          <StyledButtonPasswordReveal
            onMouseDownCapture={handleMouseDownButton}
            onMouseUpCapture={handleMouseUpButton}
            onClick={handleClickPasswordReveal}
            type={"button"}
          >
            {isPasswordVisible ? "OCULTAR" : "MOSTRAR"}
          </StyledButtonPasswordReveal>
        )}
      </StyledInputGroup>
      {getErrors(type, error)}
    </>
  );
};

const getErrors = (type, error) => {
  if (error) {
    return (
      <StyledContainerWrong>
        {type === "password" ? (
          error
            .match(/([\w\sú•êã-]+:?)/g)
            .map(erro => <StyledWrong key={erro}>{erro}</StyledWrong>)
        ) : (
          <StyledWrong>{error}</StyledWrong>
        )}
      </StyledContainerWrong>
    );
  }
};

export default Input;
