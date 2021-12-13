import React, { useEffect, useRef, useState } from "react";
import {
  StyledFlex,
  StyledCircle,
  StyledDoneIcon,
  StyledText,
  StyledLink,
} from "./styles";

const InfiniteScroll = ({
  children,
  forwardLoading,
  nextPage,
  showLoading,
  showHasNext,
}) => {
  const prevScrollY = useRef(0);
  const throttle = useRef(false);
  const [isLoading, setIsLoading] = useState(
    forwardLoading ? forwardLoading : false,
  );
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    const handleScroll = async () => {
      if (throttle.current) return;
      throttle.current = true;
      setTimeout(function () {
        throttle.current = false;
      }, 100);

      const scrolled = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;
      if (pageHeight < scrolled + 200) {
        if (prevScrollY.current < pageHeight) {
          setIsLoading(true);
          prevScrollY.current = pageHeight;
          const isFinished = await nextPage();
          setIsLoading(false);
          if (!isFinished) {
            setHasNext(false);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsLoading(forwardLoading);
  }, [forwardLoading]);

  return (
    <>
      {children}
      {showLoading && isLoading && (
        <StyledFlex
          display="flex"
          direction="column"
          justify="center"
          align="center"
          margin="4rem 0 0"
        >
          <StyledText align="center">Carregando vídeos.</StyledText>
          <StyledFlex display="flex" justify="center" no_media={1}>
            <StyledCircle />
            <StyledCircle />
            <StyledCircle />
            <StyledCircle />
          </StyledFlex>
        </StyledFlex>
      )}
      {showHasNext && !hasNext && (
        <>
          <StyledFlex
            display="flex"
            direction="column"
            justify="center"
            align="center"
            margin="4rem 0 0"
          >
            <StyledDoneIcon />
            <StyledText>Isso foi tudo que você adicionou.</StyledText>
            <StyledLink to="/InsertVideo">
              Deseja adicionar mais algum vídeo?
            </StyledLink>
          </StyledFlex>
        </>
      )}
    </>
  );
};

export default InfiniteScroll;
