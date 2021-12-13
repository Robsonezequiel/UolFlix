import React from "react";
import * as yup from "yup";
import Input from "../../../../Components/Form/Input";
import Button from "../../../../Components/Button";
import Select from "../../../../Components/Form/Select";
import DateTime from "../../../../Components/Form/Datetime";
import { StyledGroup } from "../../../../UI/FormStyle";
import { FlexDiv } from "../../../../UI/FormLoggedStyle";
import "react-stepper-js/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import { textDarkGray } from "../../../../UI/Variables";
import "moment/locale/pt";
import { StyledDiv } from "../../../EditVideo/Form/styles";

const Step3 = ({ forwardRef, nextStep, prevStep }) => {
  const validateField = async e => {
    const obj = {
      [e.target.name]: e.target.value,
    };
    const shape = {};
    if ("year" in obj) {
      shape["year"] = yup
        .string()
        .required("O ano de lançamento do vídeo não pode estar em branco");
    } else if ("duration" in obj) {
      shape["duration"] = yup
        .string()
        .required("A duração do vídeo não pode estar em branco");
    } else if ("director" in obj) {
      shape["director"] = yup
        .string()
        .required("O diretor do vídeo não pode estar em branco");
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
        year: yup
          .string()
          .required("O ano de lançamento do vídeo não pode estar em branco"),
        duration: yup
          .string()
          .required("A duração do vídeo não pode estar em branco"),
        director: yup
          .string()
          .required("O diretor do vídeo não pode estar em branco"),
        category: yup
          .string()
          .required("A categoria do vídeo deve ser selecionada"),
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
      nextStep(data);
    }
  };

  const category = [
    "Animação",
    "Comédia",
    "Drama",
    "Crime",
    "Ficção",
    "Romance",
    "Suspense",
    "Terror",
    "Ação",
    "Aventura",
    "Documentário",
    "Fantasia",
  ];

  return (
    <>
      <StyledDiv display="grid" columns="1fr 1fr " column_gap="1rem">
        <StyledGroup margin="0 0 1rem">
          <Input
            type="text"
            name="director"
            placeholder="Diretor"
            autoComplete="off"
            onBlur={validateField}
          />
        </StyledGroup>
        <StyledGroup margin="0 0 1rem">
          <Select
            name="category"
            placeholder="Selecione uma categoria"
            onBlur={validateField}
          >
            {category.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </Select>
        </StyledGroup>
      </StyledDiv>
      <StyledDiv display="grid" columns="1fr 1fr " column_gap="1rem">
        <StyledGroup margin="0 0 1rem">
          <DateTime
            name="year"
            timeFormat={false}
            dateFormat="YYYY"
            placeholder="Ano"
            autoComplete="off"
            onBlur={validateField}
          />
        </StyledGroup>
        <StyledGroup margin="0 0 1rem">
          <Input
            name="duration"
            type="text"
            placeholder="Duração"
            autoComplete="off"
            onBlur={validateField}
          />
        </StyledGroup>
      </StyledDiv>
      <StyledDiv display="flex" justify="space-between">
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
            Finalizar
          </Button>
        </StyledGroup>
      </StyledDiv>
    </>
  );
};

export default Step3;
