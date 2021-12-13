import React, { useState } from "react";
import * as yup from "yup";
import Input from "../../../../Components/Form/Input";
import Button from "../../../../Components/Button";
import { FlexDiv } from "../../../../UI/FormLoggedStyle";
import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  StyledCheckboxTitle,
  StyledGroup,
} from "../../../../UI/FormStyle";
import {
  isValidYoutubeURL,
  isValidURL,
} from "../../../../Utils/validateFunctions";
import "react-stepper-js/dist/index.css";
import "react-toastify/dist/ReactToastify.css";

const Step1 = ({ forwardRef, nextStep, data }) => {
  const [checked, setChecked] = useState(data.thumbnailUrl === "");

  const handleCheckboxChange = () => {
    forwardRef.current.setFieldValue("thumbnailUrl", "");
    forwardRef.current.setFieldError("thumbnailUrl", "");
    setChecked(checked => !checked);
  };

  const validateField = async e => {
    const obj = {
      [e.target.name]: e.target.value,
    };
    const shape = {};
    if ("youtubeVideoId" in obj) {
      shape["youtubeVideoId"] = isValidYoutubeURL();
    } else if ("thumbnailUrl" in obj) {
      shape["thumbnailUrl"] = isValidURL();
    }
    const validationErrors = {};
    try {
      const yupSchema = yup.object().shape(shape);
      await yupSchema.validate(obj, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
      }
    }
    forwardRef.current.setFieldError(
      e.target.name,
      validationErrors[e.target.name],
    );
  };

  const validateStep = async data => {
    let passed = false;
    const validationErrors = {};
    const shape = {
      youtubeVideoId: isValidYoutubeURL(),
    };
    if (!checked) {
      shape["thumbnailUrl"] = isValidURL();
    }
    try {
      const yupSchema = yup.object().shape(shape);
      await yupSchema.validate(data, {
        abortEarly: false,
      });
      passed = true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
      }
    }
    return { passed, validationErrors };
  };

  const handleNext = async () => {
    const data = forwardRef.current.getData();
    const { passed, validationErrors } = await validateStep(data);
    forwardRef.current.setErrors(validationErrors);
    if (passed) {
      const defaultValue = { ...data };
      const url = data.youtubeVideoId;
      const start = url.indexOf("v=") + 2;
      const end = url.includes("&") ? url.indexOf("&") : url.length;
      const urlId = url.substring(start, end);
      data["youtubeVideoId"] = urlId;
      if (checked) {
        data[
          "thumbnailUrl"
        ] = `https://i3.ytimg.com/vi/${urlId}/maxresdefault.jpg`;
      }
      nextStep(data, defaultValue);
    }
  };

  return (
    <>
      <StyledGroup margin="0 0 1rem">
        <Input
          type="text"
          name="youtubeVideoId"
          placeholder="URL do vídeo do youtube"
          autoComplete="off"
          defaultValue={data.youtubeVideoId}
          onBlur={validateField}
        />
      </StyledGroup>
      <StyledGroup margin="0 0 1rem">
        <Input
          disabled={checked}
          type="text"
          name="thumbnailUrl"
          placeholder="URL da imagem para a thumbnail"
          autoComplete="off"
          defaultValue={data.thumbnailUrl}
          onBlur={validateField}
        />
      </StyledGroup>
      <FlexDiv display="flex" justify="space-between">
        <StyledGroup margin="0 0 1rem">
          <CheckboxContainer>
            <HiddenCheckbox checked={checked} onChange={handleCheckboxChange} />
            <StyledCheckbox checked={checked} />
            <StyledCheckboxTitle size="1rem">
              Utilizar thumbnail original
            </StyledCheckboxTitle>
          </CheckboxContainer>
        </StyledGroup>
        <StyledGroup margin="0 0 1rem">
          <Button type="button" dataStyleType="Steps" onClick={handleNext}>
            Próximo
          </Button>
        </StyledGroup>
      </FlexDiv>
    </>
  );
};

export default Step1;
