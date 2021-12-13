import React from "react";
import Header from "../../Components/Header";
import HeroCard from "../../Components/HeroCard";
import Footer from "../../Components/Footer";
import Accordion from "../../Components/Accordion";
import {
  StyledBox,
  StyledSection,
  StyledDiv,
  StyledDivContainer,
  InvertedDiv,
  StyledGroup,
  StyledImg,
  StyledTitleGroup,
  StyledTitle,
  StyledFakeLink,
  StyledSpan,
} from "./styles";
import img01 from "../../Assets/Imagens/homeVideo01.mp4";
import img02 from "../../Assets/Imagens/homeVideo02.mp4";

const Home = () => {
  return (
    <>
      <HeroCard dataStyleType="Home">
        <Header showButton />
        <StyledBox>
          <h1>Filmes ilimitados, programas de TV e muito mais.</h1>
          <h2>Assista em qualquer lugar. Cancele a qualquer momento.</h2>
          <h3>
            Pronto para assistir? Digite seu e-mail para criar ou reiniciar sua
            associação.
          </h3>
        </StyledBox>
      </HeroCard>

      <StyledSection display="flex" align="center">
        <StyledDiv>
          <h1>Desfrute na sua TV.</h1>
          <h2>
            Assista em Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
            Blu-ray players e muito mais.
          </h2>
        </StyledDiv>
        <StyledDiv>
          <StyledDivContainer>
            <video autoPlay playsInline muted loop width="100%">
              <source src={img01} type="video/mp4" />
            </video>
          </StyledDivContainer>
        </StyledDiv>
      </StyledSection>

      <StyledSection display="flex" align="center" padding="0">
        <InvertedDiv>
          <StyledDiv>
            <h1>Baixe seus programas para assistir offline.</h1>
            <h2>
              Salve seus favoritos com facilidade e tenha sempre algo para
              assistir.
            </h2>
          </StyledDiv>
          <StyledDiv padding="0">
            <StyledDivContainer>
              <img
                width="110%"
                alt=""
                className="our-story-card-img"
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
                data-uia="our-story-card-img"
              />
              <StyledGroup>
                <StyledImg src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png" />
                <StyledTitleGroup>
                  <StyledTitle>Stranger Things</StyledTitle>
                  <StyledFakeLink>Download em andamento...</StyledFakeLink>
                </StyledTitleGroup>
                <StyledSpan />
              </StyledGroup>
            </StyledDivContainer>
          </StyledDiv>
        </InvertedDiv>
      </StyledSection>

      <StyledSection display="flex" align="center">
        <StyledDiv>
          <h1>Assista em todos os lugares.</h1>
          <h2>
            Transmita filmes e programas de TV ilimitados em seu telefone,
            tablet, laptop e TV sem pagar mais.
          </h2>
        </StyledDiv>
        <StyledDiv>
          <StyledDivContainer>
            <video autoPlay playsInline muted loop width="90%">
              <source src={img02} type="video/mp4" />
            </video>
          </StyledDivContainer>
        </StyledDiv>
      </StyledSection>

      <StyledSection display="flex" align="center">
        <InvertedDiv>
          <StyledDiv>
            <h1>Crie perfis para crianças.</h1>
            <h2>
              Envie as crianças em aventuras com seus personagens favoritos em
              um espaço feito só para eles - gratuitamente com sua assinatura.
            </h2>
          </StyledDiv>
          <StyledDiv>
            <StyledDivContainer>
              <img
                width="110%"
                alt=""
                className="our-story-card-img"
                src="https://occ-0-2823-185.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABdFTpLmANuJpYneLq8L5m7CunMCi8e8Nl4y7xaPVWzG3IeoDoq17egTQAthApKg_4sdRWdwuR8KadWu1frjL3JQImpwq.png?r=fcd"
                data-uia="our-story-card-img"
              ></img>
            </StyledDivContainer>
          </StyledDiv>
        </InvertedDiv>
      </StyledSection>

      <StyledSection display="flex" align="center">
        <Accordion />
      </StyledSection>

      <Footer page="Home" />
    </>
  );
};

export default Home;
