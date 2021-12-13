import React, { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import {
  StyledInputGroup,
  StyledDatePlaceholder,
  StyledContainerWrong,
  StyledWrong,
} from "../../../UI/FormStyle";
import { StyledDate } from "../../../UI/FormLoggedStyle";

const DateTime = ({
  type,
  name,
  placeholder,
  forwardedRef,
  defaultValue,
  onChange,
  onBlur,
  value,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(value !== undefined);
  const inputRef = forwardedRef ? forwardedRef : useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    setIsFocused(value !== undefined || inputRef.current.value !== "");
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleClose = () => {
    if (inputRef.current.value === "") {
      setIsFocused(false);
    }
  };

  const handleChange = () => {
    setTimeout(() => {
      setIsFocused(inputRef.current.value !== "");
    }, 100);
  };

  const handleKeyPress = e => {
    const isNumber = key => 47 < key && key < 58;
    const validLength = size => size < 4;
    if (!isNumber(e.charCode) || !validLength(inputRef.current.value.length))
      e.preventDefault();
  };

  return (
    <>
      <StyledInputGroup
        error={error}
        onFocus={handleFocus}
        onKeyPress={handleKeyPress}
      >
        <StyledDate
          inputProps={{
            ref: inputRef,
            name: name,
            onChange: handleChange,
          }}
          onChange={() => {
            inputRef.current.focus();
            onChange !== undefined && onChange();
          }}
          onClose={handleClose}
          initialValue={defaultValue}
          value={value}
          {...rest}
        />
        <StyledDatePlaceholder focused={isFocused}>
          {placeholder}
        </StyledDatePlaceholder>
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

export default DateTime;
