import React, { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import {
  StyledInputGroup,
  StyledSelect,
  StyledSelectArrow,
  StyledPlaceholder,
  StyledContainerWrong,
  StyledWrong,
} from "../../../UI/FormStyle";

const Select = ({
  type,
  name,
  forwardedRef,
  placeholder,
  option,
  isSelected,
  ...rest
}) => {
  const [isOptionSelected, setIsOptionSelected] = useState(
    isSelected === undefined ? false : isSelected,
  );
  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const inputRef = forwardedRef ? forwardedRef : useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  const handleFocus = () => {
    setIsOptionSelected(true);
  };

  const handleBlur = () => {
    setIsSelectOpened(false);
  };

  const handleClick = () => {
    setIsSelectOpened(isSelectOpened => !isSelectOpened);
  };

  return (
    <>
      <StyledInputGroup error={error} onBlur={handleBlur}>
        <StyledSelect
          name={name}
          ref={inputRef}
          onFocus={handleFocus}
          onClick={handleClick}
          isActive={isOptionSelected}
          {...rest}
        >
          {!isOptionSelected && <option></option>}
          {rest.children}
        </StyledSelect>
        <StyledSelectArrow
          isOpened={isSelectOpened}
          isActive={isOptionSelected}
        />
        <StyledPlaceholder isActive={isOptionSelected}>
          {placeholder}
        </StyledPlaceholder>
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

export default Select;
