import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import Header from "../../Components/Header";
import HeroCard from "../../Components/HeroCard";
import Footer from "../../Components/Footer";
import Button from "../../Components/Button";
import Input from "../../Components/Form/Input";
import Body from "../../Components/Body";
import {
  isValidUsername,
  isValidEmail,
  isValidPassword,
} from "../../Utils/validateFunctions";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  let history = useHistory();
  const formRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);
  const [knowMore, setKnowMore] = useState(false);
  const [wrongApi, setWrongApi] = useState({
    display: false,
    message: "",
  });

  const handleToast = () =>
    toast.error(
      "Usuário cadastrado com sucesso!",
      {
        position: toast.POSITION.TOP_CENTER,
      },
      history.push(`/Login?fromRegister=successfully&email=${emailRef?.current?.value}`),
    );

  const handleButtonKnowMore = () => {
    setKnowMore(knowMore => !knowMore);
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
    if ("username" in obj) {
      shape["username"] = isValidUsername();
    } else if ("email" in obj) {
      shape["email"] = isValidEmail();
    } else if ("password" in obj) {
      shape["password"] = isValidPassword(true);
      // obj["passwordConfirmation"] =
      // formRef.current.getData().passwordConfirmation;
      // shape["passwordConfirmation"] = getYupPasswordConfirmation();
    } else if ("passwordConfirmation" in obj) {
      obj["password"] = formRef.current.getData().password;
      // (shape["password"] = isValidPassword(true)),
      shape["passwordConfirmation"] = getYupPasswordConfirmation();
    }
    const validationErrors = {};
    try {
      const yupSchema = yup.object().shape(shape);
      await yupSchema.validate(obj, {
        abortEarly: false,
      });
      // for (const field in obj) {
      //   formRef.current.setFieldError(field, "");
      // }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
          // formRef.current.setFieldError(error.path, error.message);
        });
      }
    }
    formRef.current.setFieldError(
      e.target.name,
      validationErrors[e.target.name],
    );
  };

  const validateRegister = async data => {
    let passed = false;
    const validationErrors = {};
    const schema = {
      username: data.username,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
    };
    try {
      const yupSchema = yup.object().shape({
        username: isValidUsername(),
        email: isValidEmail(),
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
    const { passed, schema, validationErrors } = await validateRegister(data);
    formRef.current.setErrors(validationErrors);
    if (passed) {
      api
        .post("/users", schema)
        .then(function (response) {
          if (response.status) {
            handleToast();
          }
        })
        .catch(function (error) {
          if (error.response.status) {
            setWrongApi({
              display: true,
              message:
                "Oops... Parece que este e-mail já está vinculado a uma conta.",
            });
          }
        });
    } else {
      if (wrongApi.display) {
        setWrongApi({
          display: false,
          message: "",
        });
      }
    }
  };

  return (
    <>
      <Body>
        <HeroCard dataStyleType="Auth">
          <Header showButton />
          <ToastContainer />
          <StyledForm ref={formRef} onSubmit={handleSubmit}>
            <StyledFormContainer dataStyleType="Register">
              <StyledTitle>Cadastrar</StyledTitle>
              <StyledWrongApi display={wrongApi.display ? 1 : 0}>
                {wrongApi.message}{" "}
                <StyledLink
                  to={`/Login?email=${emailRef?.current?.value}`}
                  underline={1}
                  color="inherit"
                  size="inherit"
                >
                  Deseja fazer login?
                </StyledLink>
              </StyledWrongApi>
              <StyledGroup>
                <Input
                  name="username"
                  placeholder="Nome"
                  onBlur={validateField}
                />
              </StyledGroup>
              <StyledGroup>
                <Input
                  forwardedRef={emailRef}
                  name="email"
                  placeholder="E-mail"
                  onBlur={validateField}
                />
              </StyledGroup>
              <StyledGroup>
                <Input
                  forwardedRef={passwordRef}
                  type="password"
                  name="password"
                  placeholder="Senha"
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
              <Button dataStyleType="Auth">Cadastrar</Button>
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

export default Register;
