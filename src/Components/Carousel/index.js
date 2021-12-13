import React, { useCallback, useRef } from "react";
import {
  StyledCarousel,
  EachSlide,
  InnerEachSlide,
  StyledInnerSlide,
  StyledBox,
  NameStyled,
  StyledDivP,
  StyledDiv,
  StyledP,
  StyledPlayButton,
  StyledInfoButton,
  StyledPlayIcon,
  StyledInfoIcon,
  StyledArrowBody,
  StyledArrow,
} from "./styles.js";
import { slides } from "../../Pages/ListVideo/data.js";
import MoreInfo from "../MoreInfo";
import "react-slideshow-image/dist/styles.css";

const Carousel = () => {
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  const handleArrowClick = useCallback(isLeftArrow => {
    if (isLeftArrow) {
      leftArrowRef.current.classList.add("animate");
      setTimeout(() => {
        leftArrowRef.current.classList.remove("animate");
      }, 600);
    } else {
      rightArrowRef.current.classList.add("animate");
      setTimeout(() => {
        rightArrowRef.current.classList.remove("animate");
      }, 600);
    }
  }, []);

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: (
      <div>
        <StyledArrowBody
          display="flex"
          justify="center"
          align="center"
          isLeftArrow
          onClick={() => handleArrowClick(true)}
        >
          <StyledArrow ref={leftArrowRef} isLeftArrow />
        </StyledArrowBody>
      </div>
    ),
    nextArrow: (
      <div>
        <StyledArrowBody
          display="flex"
          justify="center"
          align="center"
          onClick={() => handleArrowClick(false)}
        >
          <StyledArrow ref={rightArrowRef} />
        </StyledArrowBody>
      </div>
    ),
  };

  return (
    <>
      <StyledCarousel {...properties}>
        {slides.map((slide, i) => (
          <EachSlide className="each-slide" key={i}>
            <InnerEachSlide>
              <StyledInnerSlide
                src={require(`../../Assets/Imagens/${slide.img}.jpg`).default}
              >
                <StyledBox display="flex" direction="column" justify="center">
                  <NameStyled
                    src={
                      require(`../../Assets/Imagens/${slide.title}.png`).default
                    }
                  />
                  <StyledDivP>
                    <StyledP>{slide.text}</StyledP>
                  </StyledDivP>
                  <StyledDiv display="flex">
                    <StyledPlayButton
                      display="grid"
                      columns="1fr 4fr"
                      column_gap="0.5rem"
                    >
                      <StyledPlayIcon />
                      <>Assistir</>
                    </StyledPlayButton>
                    <StyledInfoButton
                      display="grid"
                      columns="1fr 4fr"
                      column_gap="0.5rem"
                    >
                      <StyledInfoIcon /> Mais Informações
                    </StyledInfoButton>
                  </StyledDiv>
                </StyledBox>
              </StyledInnerSlide>
            </InnerEachSlide>
          </EachSlide>
        ))}
      </StyledCarousel>
    </>
  );
};

export default Carousel;
