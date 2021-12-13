import React from "react";
import { lime } from "../../../UI/Variables";
import { StyledFlex } from "../../../Components/InfiniteScroll/styles";
import {
  StyledDiv,
  StyledVideo,
  StyledVideoInfo,
  StyledArea,
  StyledInfoArea,
  StyledImg,
  StyledTitle,
  StyledText,
  StyledButtonIconArea,
  StyledButtonIcon,
  StyledEditIcon,
  StyledDeleteIcon,
  StyledLine,
  StyledLink,
  StyledPlayIcon,
} from "./styles";

const Videos = ({ videos, handleEdit, handleDelete }) => {
  return (
    <>
      {videos.map((video, index) => (
        <div key={index}>
          <StyledVideo columns="1.5fr 5fr" columnGap="2rem">
            <StyledDiv display="flex" justify="center" align="center">
              <StyledLink to={`/Player?video=${video.youtube_video_id}`}>
                <StyledImg src={video.thumbnail_url} />
                <StyledPlayIcon />
              </StyledLink>
            </StyledDiv>
            <StyledVideoInfo display="flex" direction="column">
              <StyledArea display="grid" columns="5fr 1fr" align="center">
                <StyledFlex display="flex" align="center">
                  <StyledTitle>{video.title}</StyledTitle>
                </StyledFlex>
                <StyledButtonIconArea display="flex" justify="flex-end">
                  <StyledButtonIcon
                    display="flex"
                    justify="center"
                    align="center"
                    onClick={() => {
                      handleEdit(video);
                    }}
                  >
                    <StyledEditIcon />
                  </StyledButtonIcon>
                  <StyledButtonIcon
                    display="flex"
                    justify="center"
                    align="center"
                    onClick={() => {
                      handleDelete(video);
                    }}
                  >
                    <StyledDeleteIcon />
                  </StyledButtonIcon>
                </StyledButtonIconArea>
              </StyledArea>
              <StyledText margin="0.5rem 0 1rem" fontSize="1em">
                {video.sinopsis}
              </StyledText>
              <StyledArea display="flex" justify="space-between" alignReset>
                <StyledInfoArea display="flex">
                  <StyledText color={lime} fontSize="0.9em">
                    {" "}
                    {video.director}
                  </StyledText>
                  <StyledText fontSize="0.9em">{video.category}</StyledText>
                </StyledInfoArea>
                <StyledInfoArea display="flex">
                  <StyledText fontSize="0.9em" align="right">
                    {video.year}
                  </StyledText>
                  <StyledText fontSize="0.9em" color={lime} align="right">
                    {video.duration}
                  </StyledText>
                </StyledInfoArea>
              </StyledArea>
            </StyledVideoInfo>
          </StyledVideo>
          {index < videos.length - 1 && <StyledLine />}
        </div>
      ))}
    </>
  );
};

export default Videos;
