import React, { useRef, useState } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Button from "../../Components/Button";
import Input from "../../Components/Form/Input";
import { isValidPassword } from "../../Utils/validateFunctions";
import { StyledTitle, StyledGroup } from "../../UI/FormStyle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../Services/api";
import { StyledButtonArea, StyledForm } from "../EditVideo/Form/styles";
import {
  StyledBody,
  StyledContainer,
  StyledContent,
} from "../EditVideo/styles";

const PasswordUpdate = () => {
  let history = useHistory();
  const formRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);

  const handleFailToast = () => {
    toast.success("Oops... Parece que algo deu errado!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const getYupPasswordConfirmation = () => {
    return yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas devem ser idênticas")
      .required("A senha não pode estar em branco");
  };

  const validateField = async e => {
    const obj = {
      [e.target.name]: e.target.value,
    };
    const shape = {};
    if ("password" in obj) {
      shape["password"] = isValidPassword(true);
    } else if ("passwordConfirmation" in obj) {
      obj["password"] = formRef.current.getData().password;
      shape["passwordConfirmation"] = getYupPasswordConfirmation();
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

  const validatePasswordUpdate = async data => {
    let passed = false;
    const validationErrors = {};
    const schema = {
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    };
    try {
      const yupSchema = yup.object().shape({
        password: isValidPassword(true),
        passwordConfirmation: getYupPasswordConfirmation(),
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
    const { passed, schema, validationErrors } = await validatePasswordUpdate(
      data,
    );
    formRef.current.setErrors(validationErrors);
    if (passed) {
      api
        .patch("/users/update", schema)
        .then(function (response) {
          if (response.status) {
            history.push("/EditVideo?fromPasswordUpdate=successfully");
          }
        })
        .catch(function (error) {
          if (error.response.status) {
            handleFailToast();
          }
        });
    }
  };

  return (
    <StyledBody
      display="flex"
      direction="column"
      justify="space-between"
      grow="1"
    >
      <Header logged={true} />
      <ToastContainer />
      <StyledContainer display="flex" direction="column" align="center">
        <StyledContent formPadding>
          <StyledTitle marginFormTitle>Editar Senha</StyledTitle>
          <StyledForm ref={formRef} onSubmit={handleSubmit}>
            <StyledGroup margin="0 0 1rem">
              <Input
                forwardedRef={passwordRef}
                type="password"
                name="password"
                placeholder="Nova senha"
                onBlur={validateField}
              />
            </StyledGroup>
            <StyledGroup margin="0 0 1rem">
              <Input
                forwardedRef={passwordConfirmationRef}
                type="password"
                name="passwordConfirmation"
                placeholder="Confirmação de senha"
                onBlur={validateField}
              />
            </StyledGroup>
            <StyledButtonArea display="flex" justify="flex-end" blockOnMobile>
              <StyledGroup margin="0 0 1rem">
                <Button width="initial" dataStyleType="Steps">
                  Salvar
                </Button>
              </StyledGroup>
            </StyledButtonArea>
          </StyledForm>
        </StyledContent>
      </StyledContainer>
      <Footer logged />
    </StyledBody>
  );
};

export default PasswordUpdate;
