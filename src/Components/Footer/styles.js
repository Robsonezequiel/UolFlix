import styled, { css } from "styled-components";
import { cardBackground, textLightGray, white } from "../../UI/Variables";
import { GrFacebook, GrInstagram, GrTwitter, GrYoutube } from "react-icons/gr";
import { Link } from "react-router-dom";
import { Display } from "../../UI/General";

const linkItemColor = "#757575";
const listItemFontSize = "0.85rem";

export const StyledFooterContainer = styled.div`
  width: 100%;
  border-top: ${props => (props.home ? "0.5rem solid #222" : "")};
  color: ${linkItemColor};

  @media (max-width: 549px) {
    padding: ${props => (props.home ? "2rem 1rem 2rem" : "2rem 0 4rem")};
  }

  @media (min-width: 550px) {
    padding: ${props => (props.home ? "4rem 2rem 2rem" : "2rem 0 4rem")};
  }

  @media (max-width: 739px) {
    border-top: ${props =>
      props.home ? "" : props.logged ? "" : `0.1rem solid ${white}`};
    background: ${props => (props.logged ? cardBackground : "black")};
  }

  @media (min-width: 740px) {
    background: ${props =>
      props.logged
        ? cardBackground
        : props.home
        ? "black"
        : "rgba(0, 0, 0, 0.75)"};
  }
`;

export const StyledFooterContent = styled.div`
  min-width: 190px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 3rem;

  @media (max-width: 500px) {
    padding: 0 1rem;
  }

  @media (min-width: 501px) and (max-width: 739px) {
    padding: 0 2rem;
  }
`;

export const StyledText = styled.p`
  font-size: 1.1rem;
  margin-top: ${props => (props.home ? "1.5rem" : "0")};
  margin-bottom: ${props => (props.home ? "0" : "1.5rem")};
`;

export const StyledSocialContainer = styled.div`
  ${props => Display[props.display]};
`;

const Icon = css`
  font-size: 1.75rem;
  color: ${textLightGray};
`;

export const FacebookIcon = styled(GrFacebook)`
  ${Icon};
`;

export const InstagramIcon = styled(GrInstagram)`
  ${Icon};
`;

export const TwitterIcon = styled(GrTwitter)`
  ${Icon};
`;

export const YoutubeIcon = styled(GrYoutube)`
  ${Icon};
`;

export const StyledList = styled.ul`
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 501px) and (max-width: 739px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 740px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StyledLink = styled(Link)`
  font-size: ${listItemFontSize};
  text-decoration: none;
  color: inherit;
  margin: ${props => (props.social ? "1rem" : "")};
  margin-left: ${props => (props.social ? "0" : "")};

  :hover {
    text-decoration: underline;
    color: inherit;
  }
`;
