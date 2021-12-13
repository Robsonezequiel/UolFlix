import React, { useState } from "react";
import { MdClear, MdAdd } from "react-icons/md";
import data from "./data.js";
import {
  StyledButtonAccordion,
  StyledDivAccordion,
  StyledTextAccordion,
  StyledDivIcon,
} from "./styles";

const Accordion = () => {
  const OpenClose = ({ title, info }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <li className="faq-accordion-item">
        <StyledButtonAccordion
          display="grid"
          columns="1fr 0.1fr"
          column_gap="0.5rem"
          align="center"
          onClick={() => setExpanded(!expanded)}
          className="faq-accordion-button"
        >
          <h3>{title}</h3>
          <StyledDivIcon display="flex" justify="flex-end">
            {expanded ? <MdClear /> : <MdAdd />}
          </StyledDivIcon>
        </StyledButtonAccordion>
        <StyledTextAccordion display="flex" direction="column" align="center">
          {expanded && <p className="faq-accordion-text">{info}</p>}
        </StyledTextAccordion>
      </li>
    );
  };

  return (
    <StyledDivAccordion className="faq">
      <h1>Perguntas Frequentes</h1>
      <div className="faq-accordion">
        <ul>
          {data.map(question => (
            <OpenClose key={question.id} {...question} />
          ))}
        </ul>
      </div>
    </StyledDivAccordion>
  );
};

export default Accordion;
