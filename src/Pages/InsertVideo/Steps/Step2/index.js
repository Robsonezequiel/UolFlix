import React from "react";
import * as yup from "yup";
import Input from "../../../../Components/Form/Input";
import Button from "../../../../Components/Button";
import TextArea from "../../../../Components/Form/TextArea";
import { StyledGroup } from "../../../../UI/FormStyle";
import { FlexDiv } from "../../../../UI/FormLoggedStyle";
import "react-stepper-js/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import { textDarkGray } from "../../../../UI/Variables";

const Step2 = ({ forwardRef, nextStep, prevStep, data }) => {
  const validateField = async e => {
    const obj = {
      [e.target.name]: e.target.value,
    };
    const shape = {};
    if ("title" in obj) {
      shape["title"] = yup
        .string()
        .required("O título do vídeo não pode estar em branco");
    } else if ("sinopsis" in obj) {
      shape["sinopsis"] = yup
        .string()
        .required("A sinopse do vídeo não pode estar em branco");
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
    try {
      const yupSchema = yup.object().shape({
        title: yup
          .string()
          .required("O título do vídeo não pode estar em branco"),
        sinopsis: yup
          .string()
          .required("A sinopse do vídeo não pode estar em branco"),
      });
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

  const handlePrev = () => {
    prevStep();
  };

  const handleNext = async () => {
    const data = forwardRef.current.getData();
    const { passed, validationErrors } = await validateStep(data);
    forwardRef.current.setErrors(validationErrors);
    if (passed) {
      nextStep(data, data);
    }
  };

  return (
    <>
      <StyledGroup margin="0 0 1rem">
        <Input
          type="text"
          name="title"
          placeholder="Título do filme"
          autoComplete="off"
          defaultValue={data.title}
          onBlur={validateField}
        />
      </StyledGroup>
      <StyledGroup margin="0 0 1rem">
        <TextArea
          resize="vertical"
          name="sinopsis"
          placeholder="Insira uma breve descrição da trama"
          autoComplete="off"
          defaultValue={data.sinopsis}
          onBlur={validateField}
        />
      </StyledGroup>
      <FlexDiv display="flex" justify="space-between">
        <StyledGroup margin="0 0 1rem">
          <Button
            type="button"
            dataStyleType="Steps"
            onClick={handlePrev}
            margin="0 0 1rem"
            background={textDarkGray}
          >
            Anterior
          </Button>
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

export default Step2;
