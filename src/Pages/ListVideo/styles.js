import styled from "styled-components";
import { Link } from "react-router-dom";
import { black, cardBackground, white } from "../../UI/Variables";
import { MdPlayArrow, MdInfo, MdInfoOutline } from "react-icons/md";
import { Display } from "../../UI/General";

export const StyledDisplay = styled.div`
  ${props => Display[props.display]};
  overflow: hidden;
  padding: 0 0 7.5rem;
`;

export const StyledCategoryTitle = styled.p`
  font-size: 1.3rem;
  margin: 2rem 0 0.5rem 0;
  color: ${white};

  /* :first-child {
    margin-top: 0;
  } */
`;

export const StyledContainer = styled.div`
  background: ${cardBackground};

  @media (max-width: 768px) {
    min-height: 75vh;
  }
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 1rem 0.5rem;
  position: relative;
  /* padding: 2rem 4rem; */
  /* margin-top: -75px; */

  @media (max-width: 1440px) {
    /* padding: 2rem 3rem; */
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1024px) {
    /* padding: 2rem 3rem; */
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    margin-top: 0;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 425px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledLink = styled(Link)`
  justify-self: ${props => (props.justify_self ? props.justify_self : "")};
  text-decoration: none;
  transition: all 0.3s;
`;

export const StyledCard = styled.div`
  position: relative;
  border: none;
  width: 100%;
  border-radius: 0.25rem;
  margin-top: 0;
  transition: margin 0s;
  transition: all 0.3s;

  @media (max-width: 425px) {
    width: 100%;
  }

  &:hover {
    z-index: 5;
    width: 100%;
    transform: scale(1.25);
    transform-origin: center;
    box-shadow: 0px 0px 2rem 0.5rem ${black};

    > svg {
      display: inline-block;
    }

    > a div {
      width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      > svg {
        display: inline-block;
      }
    }

    > a div.info {
      display: block;
      top: 100%;
      opacity: 1;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      box-shadow: 0px 0px 2rem 0.5rem ${black};
    }
  }
`;

export const StyledImgContainer = styled.div`
  position: relative;
  margin: 0 auto;
  /* width: 13rem; */
  height: 7.5rem;
  overflow: hidden;
  border-radius: 0.25rem;
  background-image: ${props =>
    props.src ? `url(${props.src})` : ""}; /* The image used */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 425px) {
    width: 100%;
    height: 10rem;
  }

  @media (max-width: 425px) {
    width: 100%;
    height: 7rem;
  }
`;

export const StyledInfo = styled.div`
  display: none;
  opacity: 0;
  position: absolute;
  top: 100%;
  width: 100%;
  padding: 0.75rem 0.75rem 1rem;
  transition: all 0.2s;
  background: ${cardBackground};
  border-radius: 0.25rem;
`;

export const StyledInfoContent = styled.div`
  font-size: 1rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 0.25rem;

  :nth-child(even) {
    /* background: red; */
    /* justify-items: right; */
  }

  @media (max-width: 1399px) {
    color: red;
  }

  @media (max-width: 1099px) {
    font-size: 0.9rem;
  }

  @media (max-width: 799px) {
    font-size: 0.8rem;
  }

  @media (max-width: 499px) {
    font-size: 0.7rem;
  }
`;

export const StyledTitle = styled.p`
  justify-self: ${props => (props.alignright ? "end" : "")};
  font-size: 1.2em;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${white};
`;

export const InfoIconContainer = styled.div`
  ${props => Display[props.display]};
`;

export const InfoIcon = styled(MdInfo)`
  font-size: 1.5em;
  border-radius: 50%;
  color: ${white};

  :hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

// export const InfoIcon = styled(MdInfo)`
//   font-size: 1.75em;
//   display: none;
//   z-index: 1;
//   position: absolute;
//   top: 0.5rem;
//   right: 0.5rem;
//   border-radius: 50%;
//   background: rgba(0, 0, 0, 0.75);
//   color: rgba(255, 255, 255, 0.9);

//   :hover {
//     opacity: 0.9;
//     cursor: pointer;
//   }
// `;

export const StyledText = styled.p`
  justify-self: ${props => (props.align_right ? "end" : "")};
  font-size: 0.8em;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => (props.color ? props.color : white)};
`;

export const StyledCarousel = styled.div`
  margin-top: -75px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledDiv = styled.div`
  background-image: url(${props => (props.src ? props.src : "")});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  padding-left: 8rem;

  @media screen and (max-width: 425px) and (max-aspect-ratio: 4 / 3) {
    width: 26.563rem;
    height: 14.941rem;
  }

  @media screen and (max-width: 768px) and (max-aspect-ratio: 4 / 3) {
    width: 48rem;
    height: 27rem;
  }
`;

export const NameStyled = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 40.625rem;

  @media screen and (max-width: 425px) and (max-aspect-ratio: 4 / 3) {
    width: 153px;
    height: auto;
  }

  @media screen and (max-width: 768px) and (max-aspect-ratio: 4 / 3) {
    width: 22rem;
    height: auto;
  }
`;

export const StyledDivP = styled.div`
  width: 37.381rem;
  height: 7.5rem;

  @media screen and (max-width: 768px) and (max-aspect-ratio: 4 / 3) {
    width: 17.279rem;
    height: 3.5rem;
  }
`;

export const StyledP = styled.p`
  font-size: 1.469rem;
  font-weight: 400;
  line-height: 0.625rem;
  width: 100%;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
  letter-spacing: -1px;
  line-height: 1.2;
  text-align: left;
  color: #fff;

  @media screen and (max-width: 425px) and (max-aspect-ratio: 4 / 3) {
    letter-spacing: 0.1px;
    line-height: 0.1;
  }

  @media screen and (max-width: 768px) and (max-aspect-ratio: 4 / 3) {
    font-size: 0.672rem;
    letter-spacing: 0.006rem;
    line-height: 1.5;
    font-weight: bold;
  }
`;

export const StyledPlayButton = styled.button`
  font-size: 1.2rem;
  background-color: white;
  color: black;
  font-weight: bold;
  width: 180.84px;
  text-align: center;
  border-radius: 6px;
  border: none;
  margin-right: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 0.4rem 1.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  @media screen and (max-width: 768px) and (max-aspect-ratio: 4 / 3) {
    padding: 0.1rem 0.4rem;
    width: 91.59px;
    height: auto;
    font-size: 10px;
  }

  @media screen and (min-width: 768px) and (max-aspect-ratio: 4 / 3) {
    padding: 0.1rem 0.4rem;
    width: 7.696rem;
    height: 2.3rem;
    font-size: 1rem;
    text-align: center;
  }
`;
