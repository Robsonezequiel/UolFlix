import React, { useCallback, useEffect, useState } from "react";
import MoreInfo from "../../MoreInfo";
import { StyledLightBox } from "../../MoreInfo/styles";
import Card from "../Card";
import {
  StyledTitle,
  StyledContainer,
  StyledContent,
  StyledPrev,
  StyledNext,
  StyledTeste,
} from "./styles";

const MovieCarousel = ({ category, videos }) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showing, setShowing] = useState(0);
  const [page, setPage] = useState(1);
  const [videoDialog, setVideoDialog] = useState({});
  const PERCENTAGE = 100 / itemsPerPage;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 425) {
        setItemsPerPage(2);
      } else if (window.innerWidth <= 768) {
        setItemsPerPage(3);
      } else if (window.innerWidth <= 1024) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(5);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize, { passive: true });

    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerPage]);

  const handleClickPrev = () => {
    if (showing % itemsPerPage === 0) {
      setShowing(showing - itemsPerPage);
    } else {
      setShowing(showing - (showing % itemsPerPage));
    }
    setPage(page - 1);
  };

  const handleClickNext = () => {
    const aux = itemsPerPage * (page + 1);
    if (videos.length < aux) {
      setShowing(videos.length - itemsPerPage);
    } else {
      setShowing(aux - itemsPerPage);
    }
    setPage(page + 1);
  };

  const handleClickOpenModal = useCallback(video => {
    setVideoDialog(video);
  }, []);

  const handleClickCloseModal = useCallback(() => {
    setVideoDialog({});
  }, []);

  return (
    <>
      {Object.keys(videoDialog).length !== 0 && (
        <>
          <StyledLightBox onClick={handleClickCloseModal} />
          <MoreInfo closeModal={handleClickCloseModal} video={videoDialog} />
        </>
      )}
      <StyledTitle>{category}</StyledTitle>
      <StyledContainer>
        <StyledPrev onClick={handleClickPrev} hide={page === 1 ? 1 : 0}>
          teste
        </StyledPrev>
        <StyledNext
          onClick={handleClickNext}
          hide={showing + itemsPerPage === videos.length ? 1 : 0}
        ></StyledNext>
        <div style={{ padding: "0 4%" }}>
          {/* <StyledTeste> */}
          <div style={{ overflowX: "visible" }}>
            <StyledContent translateX={`-${showing * PERCENTAGE}%`}>
              {videos.map((video, index) => {
                return (
                  <div
                    style={{ display: "inline-block", width: `${PERCENTAGE}%` }}
                    key={index}
                  >
                    <Card video={video} openModal={handleClickOpenModal} />
                  </div>
                );
              })}
            </StyledContent>
          </div>
        </div>
        {/* </StyledTeste> */}
      </StyledContainer>
    </>
  );
};

export default MovieCarousel;
