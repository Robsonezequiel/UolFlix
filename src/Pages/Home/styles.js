import styled from "styled-components";
import { Display } from "../../UI/General";
import { black, linkBlue, white } from "../../UI/Variables";

export const StyledBox = styled.div`
  z-index: 1;
  position: relative;
  width: 100%;
  padding: 60px 150px 100px 150px;
  max-width: 950px;
  margin: 30px auto;
  text-align: center;
  color: ${white};

  @media (max-width: 760px) {
    padding: 60px 0;
    width: 95%;
    margin: 5px;
  }
`;

export const StyledSection = styled.section`
  ${props => Display[props.display]};
  position: relative;
  margin-bottom: 0;
  padding: ${props => (props.padding ? props.padding : "0px 5% 0px 5%")};
  border-top: 8px solid #161616;
  background-color: ${black};
  color: ${white};

  @media only screen and (min-width: 550px) and (max-width: 949px),
    only screen and (min-width: 400px) and (max-width: 549px),
    only screen and (min-width: 350px) and (max-width: 399px),
    only screen and (max-width: 349px) {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: ${props => (props.padding ? props.padding : "20px")};
  }
`;

export const StyledDiv = styled.div`
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
  -webkit-box-flex: 0;
  -webkit-flex: 0 1 auto;
  -moz-box-flex: 0;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  margin: 10px;
  padding: ${props => (props.padding ? props.padding : "10px")};
  z-index: 3;

  @media only screen and (min-width: 550px) and (max-width: 949px),
    only screen and (min-width: 400px) and (max-width: 549px),
    only screen and (min-width: 350px) and (max-width: 399px),
    only screen and (max-width: 349px) {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 90%;
    align-items: center;
    text-align: center;
  }
`;

export const InvertedDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  width: 90%;
  @media (max-width: 949px) {
    flex-direction: column;
  }
`;

export const StyledDivContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const StyledGroup = styled.div`
  display: inline-flex;
  align-items: center;
  position: absolute;
  bottom: 5%;
  padding: 0.5rem;
  border: 0.125rem solid rgba(255, 255, 255, 0.25);
  border-radius: 0.75rem;
  background: black;
`;

export const StyledImg = styled.img`
  flex-grow: 0;
  flex-shrink: 0;
  max-width: 100%;
  height: 4rem;
  border: 0;

  @media (max-width: 500px) {
    height: 3rem;
  }
`;

export const StyledTitleGroup = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0 1rem;
  text-align: left;
`;

export const StyledTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  font-weight: bold;
  margin: 0;

  @media (max-width: 500px) {
    font-size: 0.9rem;
  }
`;

export const StyledFakeLink = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  color: ${linkBlue};
  margin: 0;

  @media (max-width: 500px) {
    font-size: 0.8rem;
    line-height: 1;
  }
`;

export const StyledSpan = styled.span`
  display: block;
  position: relative;
  max-width: 100%;
  width: 3rem;
  height: 1.5rem;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
