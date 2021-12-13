import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Stepper from "react-stepper-js";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Body from "../../Components/Body";
import { red, textLightGray } from "../../UI/Variables";
import { StyledGroup, StyledTitle } from "../../UI/FormStyle";
import { ToastContainer, toast } from "react-toastify";
import "react-stepper-js/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import {
  ProfileForm,
  StyledBackGround,
  StyledStepperGroup,
} from "../../UI/FormLoggedStyle";
import api from "../../Services/api";

import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import {
  StyledBody,
  StyledContainer,
  StyledContent,
} from "../EditVideo/styles";
import { StyledForm } from "../EditVideo/Form/styles";

const InsertVideo = () => {
  let history = useHistory();
  const formRef = useRef(null);
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [infoVideo, setInfoVideo] = useState({});
  const [defaultStepValue, setDefaultStepValue] = useState({});

  const handleFailToast = msg => {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const nextStep = (data, defaultValue) => {
    setEtapaAtual(etapaAtual + 1);
    setInfoVideo({ ...infoVideo, ...data });
    setDefaultStepValue({ ...defaultStepValue, ...defaultValue });
  };

  const prevStep = () => {
    setEtapaAtual(etapaAtual - 1);
  };

  const handleSubmit = async data => {
    const schema = { ...infoVideo, ...data };
    setInfoVideo(schema);
    api
      .post("/videos", schema)
      .then(response => {
        if (response.status) {
          history.push("/EditVideo?fromInsertVideo=successfully");
        }
      })
      .catch(error => {
        if (error.response.status === 500) {
          handleFailToast("Oops... Parece que este vídeo já foi cadastrado!");
        } else {
          handleFailToast("Oops... Parece que algo deu errado!");
        }
      });
  };

  const formularios = [
    <Step1 forwardRef={formRef} nextStep={nextStep} data={defaultStepValue} />,
    <Step2
      forwardRef={formRef}
      nextStep={nextStep}
      prevStep={prevStep}
      data={defaultStepValue}
    />,
    <Step3
      forwardRef={formRef}
      nextStep={handleSubmit}
      prevStep={prevStep}
      data={defaultStepValue}
    />,
  ];

  return (
    <StyledBody
      display="flex"
      direction="column"
      justify="space-between"
      grow="1"
    >
      <Header logged={true} showEditVideo={true} />
      <ToastContainer />
      <StyledContainer display="flex" direction="column" align="center">
        <StyledContent formPadding>
          <StyledTitle marginFormTitle>Cadastrar um novo vídeo</StyledTitle>
          <StyledForm
            ref={formRef}
            onSubmit={e => {
              handleSubmit(e);
            }}
          >
            <StyledGroup margin="0 0 2rem">
              <Stepper
                color={`${red}`}
                fontColor={`${textLightGray}`}
                fontSize="inherit"
                steps={[
                  { label: "Caminhos" },
                  { label: "Infos Principais" },
                  { label: "Infos Detalhadas" },
                ]}
                currentStep={etapaAtual + 1}
              />
            </StyledGroup>
            {formularios[etapaAtual]}
          </StyledForm>
        </StyledContent>
      </StyledContainer>
      <Footer logged />
    </StyledBody>
  );
};

export default InsertVideo;
