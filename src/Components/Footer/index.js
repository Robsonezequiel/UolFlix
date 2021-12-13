import React from "react";
import {
  StyledFooterContainer,
  StyledFooterContent,
  StyledText,
  StyledList,
  StyledLink,
  StyledSocialContainer,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "./styles";

const Footer = ({ logged, page }) => {
  return (
    <StyledFooterContainer home={page === "Home"} logged={logged ? 1 : 0}>
      <StyledFooterContent>
        {!logged && <StyledText>Dúvidas?</StyledText>}
        {logged && (
          <StyledSocialContainer display="flex">
            <StyledLink to="#!" social={1}>
              <FacebookIcon />
            </StyledLink>
            <StyledLink to="#!" social={1}>
              <InstagramIcon />
            </StyledLink>
            <StyledLink to="#!" social={1}>
              <TwitterIcon />
            </StyledLink>
            <StyledLink to="#!" social={1}>
              <YoutubeIcon />
            </StyledLink>
          </StyledSocialContainer>
        )}
        <StyledList>
          {!logged && (
            <>
              <li>
                <StyledLink to="#!">Perguntas frequentes</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Centro de ajuda</StyledLink>
              </li>
              {page && (
                <>
                  <li>
                    <StyledLink to="#!">Conta</StyledLink>
                  </li>
                  <li>
                    <StyledLink to="#!">Imprensa</StyledLink>
                  </li>
                  <li>
                    <StyledLink to="#!">Relações com investidores</StyledLink>
                  </li>
                  <li>
                    <StyledLink to="#!">Carreiras</StyledLink>
                  </li>
                  <li>
                    <StyledLink to="#!">Resgatar cartão pré-pago</StyledLink>
                  </li>
                  <li>
                    <StyledLink to="#!">Comprar cartão pré-pago</StyledLink>
                  </li>
                  <li>
                    <StyledLink to="#!">Formas de assistir</StyledLink>
                  </li>
                </>
              )}
              <li>
                <StyledLink to="#!">Termos de uso</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Privacidade</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Preferências de cookies</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Informações corporativas</StyledLink>
              </li>
              {page && (
                <>
                  <li>
                    <StyledLink to="#!">Entre em contato</StyledLink>
                  </li>
                  <li>
                    <StyledLink to="#!">Teste de velocidade</StyledLink>
                  </li>
                  <li>
                    <StyledLink to="#!">Avisos legais</StyledLink>
                  </li>
                  <li>
                    <StyledLink to="#!">Só na Uolflix</StyledLink>
                  </li>
                </>
              )}
            </>
          )}
          {logged && (
            <>
              <li>
                <StyledLink to="#!">Idioma e legendas</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Audiodescrição</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Centro de ajuda</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Cartão pré-pago</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Imprensa</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Relações com investidores</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Carreiras</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Termos de uso</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Privacidade</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Avisos legais</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Preferências de cookies</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Informações corporativas</StyledLink>
              </li>
              <li>
                <StyledLink to="#!">Entre em contato</StyledLink>
              </li>
            </>
          )}
        </StyledList>
        {page && <StyledText home={page === "Home"}>Uolflix Brasil</StyledText>}
        {!page && logged && <StyledText home={1}>Uolflix Brasil</StyledText>}
      </StyledFooterContent>
    </StyledFooterContainer>
  );
};

export default Footer;
