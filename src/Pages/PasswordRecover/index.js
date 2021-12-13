import React, { useRef, useState } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import Header from "../../Components/Header";
import HeroCard from "../../Components/HeroCard";
import Footer from "../../Components/Footer";
import Button from "../../Components/Button";
import Input from "../../Components/Form/Input";
import Body from "../../Components/Body";
import { isValidEmail } from "../../Utils/validateFunctions";
import {
  StyledForm,
  StyledWrongApi,
  StyledTitle,
  StyledFormContainer,
  StyledGroup,
  StyledKnowMoreButton,
  StyledKnowMore,
  StyledLink,
  StyledTerms,
} from "../../UI/FormStyle";
import { linkBlue } from "../../UI/Variables";
import api from "../../Services/api";

const PasswordRecover = () => {
  let history = useHistory();
  const formRef = useRef(null);
  const [knowMore, setKnowMore] = useState(false);
  const [wrongApi, setWrongApi] = useState({
    display: false,
    message: "",
  });

  const handleButtonKnowMore = () => {
    setKnowMore(knowMore => !knowMore);
  };

  const validateField = async e => {
    const obj = {
      [e.target.name]: e.target.value,
    };
    const shape = {};
    if ("email" in obj) shape["email"] = isValidEmail();
    else if ("password" in obj) {
      shape["password"] = isValidPassword(false);
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

  const validatePasswordRecover = async data => {
    let passed = false;
    const validationErrors = {};
    const schema = {
      email: data.email,
    };
    try {
      const yupSchema = yup.object().shape({
        email: isValidEmail(),
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
    const { passed, schema, validationErrors } = await validatePasswordRecover(
      data,
    );
    formRef.current.setErrors(validationErrors);
    if (passed) {
      api
        .post("/passwords", schema)
        .then(function (response) {
          if (response.status) {
            sessionStorage.setItem(
              "@uolflix:forgotPasswordToken",
              response.data.token,
            );
            history.push("/Token");
          }
        })
        .catch(function (error) {
          console.log(error);
          if (error.response.status) {
            setWrongApi({
              display: true,
              message: "O e-mail informado não é valido!",
            });
          }
        });
    }
  };

  return (
    <>
      <Body>
        <HeroCard dataStyleType="Auth">
          <Header showButton />
          <StyledForm ref={formRef} onSubmit={handleSubmit}>
            <StyledFormContainer dataStyleType="Recover">
              <StyledTitle>Esqueci minha senha</StyledTitle>
              <p>Digite o e-mail cadastrado para prosseguir.</p>
              <p>
                Enviaremos um e-mail com instruções de como redefinir sua senha.
              </p>
              <StyledWrongApi display={wrongApi.display ? 1 : 0}>
                {wrongApi.message}
              </StyledWrongApi>
              <StyledGroup>
                <Input
                  name="email"
                  placeholder="nome@exemplo.com.br"
                  onBlur={validateField}
                />
              </StyledGroup>
              <Button type="Submit" dataStyleType="Auth">
                Enviar por e-mail
              </Button>
            </StyledFormContainer>
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

export default PasswordRecover;
