import React, { useRef } from "react";
import * as yup from "yup";
import Button from "../../../Components/Button";
import Input from "../../../Components/Form/Input";
import TextArea from "../../../Components/Form/TextArea";
import Select from "../../../Components/Form/Select";
import DateTime from "../../../Components/Form/Datetime";
import { StyledGroup } from "../../../UI/FormStyle";
import { toast } from "react-toastify";
import {
  StyledForm,
  StyledButtonArea,
  StyledDiv,
  StyledGridBottom,
} from "./styles";
import { textDarkGray } from "../../../UI/Variables";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../Services/api";

const EditForm = ({ video, handleBack }) => {
  const formRef = useRef(null);

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
    } else if ("director" in obj) {
      shape["director"] = yup
        .string()
        .required("O diretor do vídeo não pode estar em branco");
    } else if ("year" in obj) {
      shape["year"] = yup
        .string()
        .required("O ano de lançamento do vídeo não pode estar em branco");
    } else if ("duration" in obj) {
      shape["duration"] = yup
        .string()
        .required("A duração do vídeo não pode estar em branco");
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
    formRef.current.setFieldError(
      e.target.name,
      validationErrors[e.target.name],
    );
  };

  const validateForm = async data => {
    let passed = false;
    const validationErrors = {};
    const schema = {
      ...video,
      title: data.title,
      category: data.category,
      sinopsis: data.sinopsis,
      director: data.director,
      year: data.year,
      duration: data.duration,
    };
    try {
      const yupSchema = yup.object().shape({
        title: yup
          .string()
          .required("O título do vídeo não pode estar em branco"),
        sinopsis: yup
          .string()
          .required("A sinopse do vídeo não pode estar em branco"),
        director: yup
          .string()
          .required("O diretor do vídeo não pode estar em branco"),
        year: yup
          .string()
          .required("O ano de lançamento do vídeo não pode estar em branco"),
        duration: yup
          .string()
          .required("A duração do vídeo não pode estar em branco"),
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
    return { passed, schema, validationErrors };
  };

  const handleSubmit = async data => {
    const { passed, schema, validationErrors } = await validateForm(data);
    formRef.current.setErrors(validationErrors);
    if (passed) {
      api
        .patch(`/videos/${video.id}`, schema)
        .then(response => {
          if (response.status) {
            toast.success("Vídeo atualizado com sucesso!", {
              position: toast.POSITION.TOP_CENTER,
            });
            handleBack(schema);
          }
        })
        .catch(error => {
          if (error.status) {
            toast.error("Não foi possível atualizar o vídeo!", {
              position: toast.POSITION.TOP_CENTER,
            });
            handleBack();
          }
        });
    }
  };

  const categories = [
    "Animação",
    "Comédia",
    "Drama",
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
      <StyledForm ref={formRef} onSubmit={handleSubmit}>
        <StyledDiv display="grid" columns="2fr 1fr " column_gap="1rem">
          <StyledGroup margin="0 0 1rem">
            <Input
              name="title"
              defaultValue={video.title}
              placeholder="Título"
              onBlur={validateField}
            />
          </StyledGroup>
          <StyledGroup margin="0 0 1rem">
            <Select
              name="category"
              placeholder="Selecione uma categoria"
              isSelected={video.category !== undefined}
              defaultValue={video.category}
            >
              {categories.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </StyledGroup>
        </StyledDiv>
        <StyledGroup margin="0 0 1rem">
          <TextArea
            resize="vertical"
            name="sinopsis"
            defaultValue={video.sinopsis}
            placeholder="Sinopse"
            onBlur={validateField}
          />
        </StyledGroup>
        <StyledDiv display="grid" columns="2fr 1fr 1fr" column_gap="1rem">
          <StyledGroup margin="0 0 1rem">
            <Input
              name="director"
              defaultValue={video.director}
              placeholder="Diretor"
              onBlur={validateField}
            />
          </StyledGroup>
          <StyledGroup margin="0 0 1rem">
            <DateTime
              name="year"
              timeFormat={false}
              dateFormat="YYYY"
              placeholder="Ano"
              // note que os parâmetros mês = 0 e o dia = 1 servem apenas por conta
              // da necessidade do construtor, mas o que nos interessa, de fato, é
              // somente o ano
              defaultValue={new Date(video.year, 0, 1)}
              onBlur={validateField}
            />
          </StyledGroup>
          <StyledGroup margin="0 0 1rem">
            <Input
              name="duration"
              defaultValue={video.duration}
              placeholder="Duração"
              onBlur={validateField}
            />
          </StyledGroup>
        </StyledDiv>
        <StyledButtonArea display="flex" justify="space-between" blockOnMobile>
          <StyledGroup margin="0 0 1rem">
            <Button
              type="button"
              dataStyleType="Steps"
              onClick={() => {
                handleBack();
              }}
              margin="0 0 1rem"
              background={textDarkGray}
            >
              Cancelar
            </Button>
          </StyledGroup>
          <StyledGroup margin="0 0 1rem">
            <Button dataStyleType="Steps">Salvar</Button>
          </StyledGroup>
        </StyledButtonArea>
      </StyledForm>
    </>
  );
};

export default EditForm;
