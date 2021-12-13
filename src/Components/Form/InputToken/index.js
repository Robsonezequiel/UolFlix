import React, { useCallback, useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import { validateToken } from "../../../Utils/validateFunctions";
import {
  StyledTokenContainer,
  StyledInputGroup,
  StyledInputToken,
  StyledTokenPlaceholder,
  StyledContainerWrong,
  StyledWrong,
} from "../../../UI/FormStyle";

const loadTokens = (name, numOfTokens) => {
  const tokens = [];
  const inputRefs = [];

  for (let i = 0; i < numOfTokens; i++) {
    inputRefs.push(useRef(null));
    tokens.push(useField(`${name}${i}`));
  }

  tokens.forEach((token, i) => {
    token.registerField({
      name: tokens[i].fieldName,
      ref: inputRefs[i].current,
      path: "value",
    });
  });

  return { tokens, inputRefs };
};

const InputToken = ({ name, numOfTokens, forwardedFormRef, ...rest }) => {
  const { tokens, inputRefs } = loadTokens(name, numOfTokens);
  const [errorMsg, setErrorMsg] = useState(undefined);

  useEffect(() => {
    let i = 0;
    while (i < numOfTokens && tokens[i].error === undefined) {
      i++;
    }
    if (i < numOfTokens) {
      setErrorMsg(tokens[i].error);
    } else {
      setErrorMsg(undefined);
    }
  }, [tokens]);

  const revalidate = async (name, value) => {
    const data = { [name]: value };
    const { validationErrors } = await validateToken(data);
    forwardedFormRef.current.setFieldError(name, validationErrors[name]);
  };

  const handleChangeNextFocus = useCallback((e, i) => {
    revalidate(e.target.name, e.target.value);

    if (
      inputRefs[i].current === e.target &&
      inputRefs[i].current.value !== ""
    ) {
      inputRefs[i + 1]?.current?.focus();
    }
  }, []);

  const handlePaste = useCallback(e => {
    const { name } = e.target;
    const paste = e.clipboardData.getData("Text");
    const startAtToken = parseInt(name.charAt(name.length - 1));

    for (let i = startAtToken; i < 6; i++) {
      inputRefs[i].current.value = paste.charAt(i - startAtToken);
      revalidate(inputRefs[i].current.name, inputRefs[i].current.value);
    }
  }, []);

  return (
    <>
      <StyledTokenContainer>
        {tokens.map((token, i) => (
          <StyledInputGroup key={i}>
            <StyledInputToken
              type="text"
              name={`${name}${i}`}
              ref={inputRefs[i]}
              defaultValue={token.defaultValue}
              placeholder=" "
              onChange={e => {
                handleChangeNextFocus(e, i);
              }}
              onPaste={handlePaste}
              {...rest}
            />
            <StyledTokenPlaceholder error={tokens[i].error} />
          </StyledInputGroup>
        ))}
      </StyledTokenContainer>
      {errorMsg && (
        <StyledContainerWrong>
          <StyledWrong>{errorMsg}</StyledWrong>
        </StyledContainerWrong>
      )}
    </>
  );
};

export default InputToken;
