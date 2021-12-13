import styled from "styled-components";
import { Display } from "../../UI/General";
import { darkGray } from "../../UI/Variables";

export const StyledButtonAccordion = styled.button`
  ${props => Display[props.display]};
  font: inherit;
  font-size: 26px;
  font-weight: 400;
  position: relative;
  margin-bottom: 1px;
  margin: 0;
  padding: 0em 1.5em;
  overflow: visible;
  width: 100%;
  border: 0;
  text-align: left;
  text-transform: none;
  background: ${darkGray};
  color: inherit;

  @media (max-width: 425px) {
    padding: 0em 1.25rem;
  }
`;

export const StyledDivAccordion = styled.div`
  margin: 0 auto 30px;
  width: 77%;

  .faq-accordion-item {
    list-style-type: none;
    margin: 0 0 8px 0;
    @media (max-width: 949px) and (min-width: 550px) {
      /* width: 85%; */
    }

    @media (max-width: 549px) {
      width: 100%;
    }
  }

  .faq-accordion-text {
    width: 100%;
    margin-top: 1px;
    margin-bottom: 0;
    background-color: ${darkGray};
    padding: 30px;
  }

  h1 {
    text-align: center;
    padding: 3rem 0 4rem 0;
    font-size: 3rem;
  }

  ul.faq-accordion {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledTextAccordion = styled.div`
  ${props => Display[props.display]};
`;

export const StyledDivIcon = styled.div`
  ${props => Display[props.display]};
`;
