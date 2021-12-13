import React from "react";
import { Hero } from "./styles.js";

const HeroCard = ({ children, dataStyleType }) => {
  return <Hero dataStyleType={dataStyleType}>{children}</Hero>;
};

export default HeroCard;
