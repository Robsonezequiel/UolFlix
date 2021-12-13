import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import Header from "../../Components/Header";
import HeroCard from "../../Components/HeroCard";
import Footer from "../../Components/Footer";
import Body from "../../Components/Body";
import Button from "../../Components/Button";
import Input from "../../Components/Form/Input";
import { isValidPassword } from "../../Utils/validateFunctions";
import {
  StyledForm,
  StyledWrongApi,
  StyledTitle,
  StyledFormContainer,
  StyledGroup,
  StyledHelper,
  StyledLink,
  StyledTerms,
  StyledKnowMoreButton,
  StyledKnowMore,
} from "../../UI/FormStyle";
import { linkBlue } from "../../UI/Variables";
import api from "../../Services/api";

const PasswordReset = () => {
  let history = useHistory();
  const formRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);
  const [knowMore, setKnowMore] = useState(false);
  const [wrongApi, setWrongApi] = useState({
    display: false,
    message: "",
  });

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

  const validatePasswordReset = async data => {
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
    const { passed, schema, validationErrors } = await validatePasswordReset(
      data,
    );
    formRef.current.setErrors(validationErrors);
    if (passed) {
      const token = sessionStorage.getItem("@uolflix:forgotPasswordToken");
      api
        .put("/passwords", { token: token, ...schema })
        .then(function (response) {
          if (response.status) {
            sessionStorage.removeItem("@uolflix:forgotPasswordToken");
            history.push("/Login?fromPasswordReset=successfully");
          }
        })
        .catch(function (error) {
          if (error.response.status) {
            setWrongApi({
              display: true,
              message: error.response.data.error.message,
            });
          }
        });
    }
  };

  const handleButtonKnowMore = () => {
    setKnowMore(knowMore => !knowMore);
  };

  return (
    <>
      <Body>
        <HeroCard dataStyleType="Auth">
          <Header showButton />
          <StyledForm ref={formRef} onSubmit={handleSubmit}>
            <StyledTitle>Redefinição de senha</StyledTitle>
            <StyledWrongApi display={wrongApi.display ? 1 : 0}>
              {wrongApi.message}
            </StyledWrongApi>
            <StyledFormContainer dataStyleType="PasswordReset">
              <StyledGroup>
                <Input
                  forwardedRef={passwordRef}
                  type="password"
                  name="password"
                  placeholder="Nova senha"
                  onBlur={validateField}
                />
              </StyledGroup>
              <StyledGroup>
                <Input
                  forwardedRef={passwordConfirmationRef}
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirmação de senha"
                  onBlur={validateField}
                />
              </StyledGroup>
              <Button dataStyleType="Auth">Confirmar</Button>
            </StyledFormContainer>
            <StyledHelper justify="center">
              <StyledLink to="/Login">
                Já possui uma conta? Entre aqui
              </StyledLink>
            </StyledHelper>
            <StyledTerms>
              Esta página é protegida pelo Google reCAPTCHA para garantir que
              você não é um robô.{" "}
              <StyledKnowMoreButton
                type="button"
                knowMore={knowMore}
                onClick={handleButtonKnowMore}
              >
                Saiba mais.
              </StyledKnowMoreButton>
              <StyledKnowMore knowMore={knowMore}>
                As informações recolhidas pelo Google reCAPTCHA estão sujeitas à{" "}
                <StyledLink color={linkBlue} to="#!">
                  Política de Privacidade
                </StyledLink>{" "}
                e{" "}
                <StyledLink color={linkBlue} to="#!">
                  Termos de Uso
                </StyledLink>
                , e são usadas para oferecer, manter e melhorar o serviço
                reCAPTCHA e por questões de segurança (não são usadas para
                exibir anúncios personalizados pelo Google).
              </StyledKnowMore>
            </StyledTerms>
          </StyledForm>
          <Footer />
        </HeroCard>
      </Body>
    </>
  );
};

export default PasswordReset;
