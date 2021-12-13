import React from "react";
import { StyledIcon, StyledPlayer, StyledBack } from "./styles.js";
import Body from "../../Components/Body";
import { useHistory, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Player = () => {
  let query = useQuery();
  let history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <>
      <Body >
        <StyledBack>
          <StyledIcon onClick={handleClick} />
          <StyledPlayer
            playing
            controls
            config={{ youtube: { playerVars: { disablekb: 1 } } }}
            url={
              "https://www.youtube.com/embed/" +
              query.get("video") +
              "?frameborder='0'&infoshow='0'"
            }
          />
        </StyledBack>
      </Body>
    </>
  );
};

export default Player;
