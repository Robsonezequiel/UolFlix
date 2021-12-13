import React, { useRef, useState, useEffect } from "react";
import * as yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import HeroCard from "../../Components/HeroCard";
import Footer from "../../Components/Footer";
import Button from "../../Components/Button";
import Input from "../../Components/Form/Input";
import Body from "../../Components/Body";
import { isValidEmail, isValidPassword } from "../../Utils/validateFunctions";
import {
  StyledForm,
  StyledTitle,
  StyledWrongApi,
  StyledFormContainer,
  StyledGroup,
  StyledHelper,
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  StyledCheckboxTitle,
  StyledLink,
  StyledFacebook,
  StyledFacebookImg,
  StyledFacebookTitle,
  StyledSignUpArea,
  StyledTerms,
  StyledKnowMoreButton,
  StyledKnowMore,
} from "../../UI/FormStyle";
import { white, linkBlue } from "../../UI/Variables";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../Services/api";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login = () => {
  let history = useHistory();
  let query = useQuery();
  const formRef = useRef(null);
  const [checked, setChecked] = useState(true);
  const [knowMore, setKnowMore] = useState(false);
  const [wrongApi, setWrongApi] = useState({
    display: false,
    message: "",
  });

  useEffect(() => {
    if (query.get("fromRegister") === "successfully") {
      toast.success("Usuário Cadastrado com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (query.get("fromPasswordReset") === "successfully") {
      toast.success("Senha redefinida com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, []);

  const handleCheckboxChange = () => {
    setChecked(checked => !checked);
  };

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

  const validateLogin = async data => {
    let passed = false;
    const validationErrors = {};
    const schema = {
      email: data.email,
      password: data.password,
    };
    try {
      const yupSchema = yup.object().shape({
        email: isValidEmail(),
        password: isValidPassword(false),
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
    const { passed, schema, validationErrors } = await validateLogin(data);
    formRef.current.setErrors(validationErrors);
    if (passed) {
      api
        .post("/sessions", schema)
        .then(response => {
          if (response.status) {
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.token}`;
            api
              .get("/users/info")
              .then(userResponse => {
                console.log(userResponse);
                localStorage.setItem("@uolflix:loginId", userResponse.data.id);
                localStorage.setItem(
                  "@uolflix:loginToken",
                  response.data.token,
                );
                localStorage.setItem(
                  "@uolflix:loginEmail",
                  userResponse.data.email,
                );
                localStorage.setItem(
                  "@uolflix:loginUsername",
                  userResponse.data.username,
                );
                localStorage.setItem(
                  "@uolflix:loginVideos",
                  JSON.stringify(userResponse.data.videos),
                );
                history.push("/ListVideo");
              })
              .catch(userError => {
                console.log(userError);
              });
          }
        })
        .catch(error => {
          if (error.response.status) {
            setWrongApi({
              display: true,
              message: "Oops... usuário ou senha incorretos!",
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
          <Header />
          <StyledForm ref={formRef} onSubmit={handleSubmit}>
            <StyledFormContainer dataStyleType="Auth">
              <StyledTitle>Entrar</StyledTitle>
              <StyledWrongApi display={wrongApi.display ? 1 : 0}>
                {wrongApi.message}
              </StyledWrongApi>
              <ToastContainer />
              <StyledGroup>
                <Input
                  name="email"
                  placeholder="E-mail"
                  onBlur={validateField}
                  defaultValue={query.get("email")}
                />
              </StyledGroup>
              <StyledGroup>
                <Input
                  type="password"
                  name="password"
                  placeholder="Senha"
                  onBlur={validateField}
                />
              </StyledGroup>
              <Button type="Submit" dataStyleType="Auth">
                Entrar
              </Button>
            </StyledFormContainer>
            <StyledHelper>
              <CheckboxContainer>
                <HiddenCheckbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                />
                <StyledCheckbox checked={checked} />
                <StyledCheckboxTitle>Lembre-se de mim</StyledCheckboxTitle>
              </CheckboxContainer>
              <StyledLink to="/PasswordRecover">Esqueci minha senha</StyledLink>
            </StyledHelper>
            <StyledFacebook>
              <StyledFacebookImg
                src="https://assets.nflxext.com/ffe/siteui/login/images/FB-f-Logo__blue_57.png"
                alt="Facebook"
              />
              <StyledFacebookTitle>Conectar com o Facebook</StyledFacebookTitle>
            </StyledFacebook>
            <StyledSignUpArea>
              Novo por aqui?{" "}
              <StyledLink
                to="/Register"
                color={white}
                size="1rem"
                marginleft="0.25rem"
              >
                Assine agora
              </StyledLink>
              .
            </StyledSignUpArea>
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

export default Login;
