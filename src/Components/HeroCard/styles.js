import styled, { css } from "styled-components";
import fundoHero from "../../Assets/Imagens/fundoHero.jpg";
import { black } from "../../UI/Variables";

const HeroStyle = {
  Home: css`
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(${fundoHero});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: static;
    right: 0;
    left: 0;
    padding: 30px 30px 80px 30px;
  `,

  Auth: css`
    width: 100%;

    @media (max-width: 500px) {
      background-color: ${black};
      background-image: none;
      padding: 0;
    }

    @media (min-width: 501px) and (max-width: 739px) {
      background-color: ${black};
      background-image: none;
      position: relative;
      padding: 0;
    }

    @media (min-width: 740px) {
      background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
        url(${fundoHero});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      position: static;
      right: 0;
      left: 0;
    }
  `,
};

export const Hero = styled.div`
  ${props => HeroStyle[props.dataStyleType]};
`;

// export const HeroCard = styled.div`
//   ${props => HeroStyle[props.dataStyleType]};
// `;
