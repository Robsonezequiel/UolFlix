import React from "react";
import { lime } from "../../UI/Variables";
import {
  StyledLightBox,
  StyledContainer,
  StyledContent,
  StyledDiv,
  StyledLink,
  StyledBanner,
  StyledText,
  StyledCloseButton,
  StyledCloseIcon,
  StyledPlayButton,
} from "./styles";
import { StyledPlayIcon } from "../Carousel/styles";

const MoreInfo = ({ closeModal, video }) => {
  return (
    <>
      <StyledContainer>
        <StyledCloseButton onClick={closeModal}>
          <StyledCloseIcon />
        </StyledCloseButton>
        <StyledLink to={`/Player?video=${video.youtube_video_id}`}>
          <StyledBanner src={video.thumbnail_url}>
            <StyledPlayButton
              display="grid"
              columns="1fr 4fr"
              column_gap="0.5rem"
            >
              <StyledPlayIcon />
              <>Assistir</>
            </StyledPlayButton>
          </StyledBanner>
        </StyledLink>
        <StyledContent>
          <StyledText bold={1} size="2rem">
            {video.title}
          </StyledText>
          <StyledDiv display="grid" columns="2fr 1fr" column_gap="2rem">
            <div>
              <StyledText>{video.sinopsis}</StyledText>
            </div>
            <div>
              <StyledText>Categoria: {video.category}</StyledText>
              <StyledText color={lime}>Diretor: {video.director}</StyledText>
              <StyledText>Ano: {video.year}</StyledText>
              <StyledText color={lime}>Duração: {video.duration}</StyledText>
            </div>
          </StyledDiv>
        </StyledContent>
      </StyledContainer>
    </>
  );
};

export default MoreInfo;
