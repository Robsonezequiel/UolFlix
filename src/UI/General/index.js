import { css } from "styled-components";

export const Flex = {};

export const Display = {
  flex: css`
    display: flex;

    /* properties for the parent */
    flex-direction: ${props => (props.direction ? props.direction : "")};
    flex-wrap: ${props => (props.wrap ? props.wrap : "")};
    flex-flow: ${props => (props.flow ? props.flow : "")};
    justify-content: ${props => (props.justify ? props.justify : "")};
    align-items: ${props => (props.align ? props.align : "")};
    align-content: ${props => (props.align_content ? props.align_content : "")};

    /* properties for the children */
    order: ${props => (props.order ? props.order : "")};
    flex-grow: ${props => (props.grow ? props.grow : "")};
    flex-shrink: ${props => (props.shrink ? props.shrink : "")};
    flex-basis: ${props => (props.basis ? props.basis : "")};
    align-self: ${props => (props.self ? props.self : "")};
  `,

  grid: css`
    display: grid;

    /* properties for the parent */
    grid-template-columns: ${props => (props.columns ? props.columns : "")};
    grid-template-rows: ${props => (props.rows ? props.rows : "")};
    grid-template-areas: ${props => (props.areas ? props.areas : "")};
    column-gap: ${props => (props.column_gap ? props.column_gap : "")};
    row-gap: ${props => (props.row_gap ? props.row_gap : "")};
    gap: ${props => (props.gap ? props.gap : "")};
    justify-items: ${props => (props.justify ? props.justify : "")};
    align-items: ${props => (props.align ? props.align : "")};
    justify-content: ${props =>
      props.justify_content ? props.justify_content : ""};
    align-content: ${props => (props.align_content ? props.align_content : "")};

    /* properties for the children */
    grid-column-start: ${props =>
      props.column_start ? props.column_start : ""};
    grid-column-end: ${props => (props.column_end ? props.column_end : "")};
    grid-row-start: ${props => (props.row_start ? props.row_start : "")};
    grid-row-end: ${props => (props.row_end ? props.row_end : "")};
    grid-column: ${props => (props.column ? props.column : "")};
    grid-row: ${props => (props.row ? props.row : "")};
    grid-area: ${props => (props.area ? props.area : "")};
    justify-self: ${props => (props.justify_self ? props.justify_self : "")};
    align-self: ${props => (props.align_self ? props.align_self : "")};
    grid-area: ${props => (props.area ? props.area : "")};
  `,

  none: css`
    display: none;
  `,
};
