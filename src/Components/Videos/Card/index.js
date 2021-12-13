import React from "react";
import { lime } from "../../../UI/Variables";
import {
  StyledCard,
  StyledCardLink,
  StyledCardImg,
  StyledCardContainer,
  StyledCardContent,
  StyledCardTitle,
  StyledCardIconArea,
  StyledCardIcon,
  StyledCardText,
} from "./styles";

const Card = ({ video, openModal }) => {
  return (
    <StyledCard>
      <StyledCardLink
        to={`/Player?video=${video.youtube_video_id}`}
        tabIndex="-1"
      >
        <StyledCardImg src={video.thumbnail_url} />
        <StyledCardContainer className="info">
          <StyledCardContent>
            <StyledCardTitle>{video.title}</StyledCardTitle>
            <StyledCardIconArea display="flex" justify="flex-end">
              <StyledCardIcon
                tabIndex="0"
                onClick={e => {
                  e.preventDefault();
                  openModal(video);
                }}
              />
            </StyledCardIconArea>
            <StyledCardText color={lime}>{video.director}</StyledCardText>
            <StyledCardText align_right={1}>{video.duration}</StyledCardText>
          </StyledCardContent>
        </StyledCardContainer>
      </StyledCardLink>
    </StyledCard>
  );
};

export default Card;
