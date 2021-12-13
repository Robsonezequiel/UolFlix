import React from "react";
import { red, cardBackground } from "../../../UI/Variables";
import {
  StyledDiv,
  StyledTextArea,
  StyledText,
  StyledHelper,
  StyledVideoTitle,
  StyledButtonArea,
  StyledButton,
} from "./styles";

const ConfirmDialog = ({ video, onClose, onConfirm }) => {
  return (
    <StyledDiv display="flex" direction="column">
      <StyledTextArea display="flex" direction="column" justify="center">
        <StyledText>Tem certeza que deseja excluir?</StyledText>
        <StyledHelper>
          Você está excluindo:{" "}
          <StyledVideoTitle>{video.title}</StyledVideoTitle>
        </StyledHelper>
      </StyledTextArea>
      <StyledButtonArea columns="1fr 1fr">
        <StyledButton color={cardBackground} onClick={onClose}>
          Cancelar
        </StyledButton>
        <StyledButton color={red} onClick={onConfirm}>
          Excluir
        </StyledButton>
      </StyledButtonArea>
    </StyledDiv>
  );
};

export default ConfirmDialog;
