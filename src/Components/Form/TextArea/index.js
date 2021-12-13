import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import {
  StyledInputGroup,
  StyledTextArea,
  StyledPlaceholder,
  StyledContainerWrong,
  StyledWrong,
} from "../../../UI/FormStyle";

const TextArea = ({
  type,
  name,
  placeholder,
  forwardedRef,
  defaultValue,
  ...rest
}) => {
  const inputRef = forwardedRef ? forwardedRef : useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <>
      <StyledInputGroup error={error}>
        <StyledTextArea
          type={type ? type : "text"}
          name={name}
          ref={inputRef}
          defaultValue={defaultValue}
          placeholder=" "
          {...rest}
        />
        <StyledPlaceholder>{placeholder}</StyledPlaceholder>
      </StyledInputGroup>
      {getErrors(error)}
    </>
  );
};

const getErrors = error => {
  if (error) {
    return (
      <StyledContainerWrong>
        <StyledWrong>{error}</StyledWrong>
      </StyledContainerWrong>
    );
  }
};

export default TextArea;
