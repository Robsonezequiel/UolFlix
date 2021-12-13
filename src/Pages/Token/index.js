import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../Components/Header";
import HeroCard from "../../Components/HeroCard";
import Footer from "../../Components/Footer";
import Button from "../../Components/Button";
import InputToken from "../../Components/Form/InputToken";
import Body from "../../Components/Body";
import { validateToken } from "../../Utils/validateFunctions";
import {
  StyledWrongApi,
  StyledForm,
  StyledTitle,
  StyledFormContainer,
  StyledGroup,
  StyledLink,
  StyledTerms,
  StyledKnowMoreButton,
  StyledKnowMore,
} from "../../UI/FormStyle";
import { linkBlue } from "../../UI/Variables";
import api from "../../Services/api";

const Token = () => {
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

  const handleSubmit = async data => {
    const { passed, schema, validationErrors } = await validateToken(data);
    formRef.current.setErrors(validationErrors);
    if (passed) {
      console.log(schema);
      api
        .post("/passwords/token", schema)
        .then(function (response) {
          if (response.status) {
            history.push("/PasswordReset");
          }
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            setWrongApi({
              display: true,
              message:
                "Oops... Este token já expirou, por favor faça uma nova solicitação de troca da senha!",
            });
          } else {
            setWrongApi({
              display: true,
              message:
                "Oops... Parece que houve um erro. Este token não é válido!",
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
            <StyledFormContainer dataStyleType="Token">
              <StyledTitle>Insira o Token</StyledTitle>
              <p>Informe o token enviado por e-mail</p>
              <StyledWrongApi display={wrongApi.display ? 1 : 0}>
                {wrongApi.message}
              </StyledWrongApi>
              <StyledGroup>
                <InputToken
                  name="token"
                  numOfTokens="6"
                  maxLength="1"
                  autoComplete="new-password"
                  forwardedFormRef={formRef}
                />
              </StyledGroup>
              <Button dataStyleType="Auth">Validar</Button>
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

export default Token;
