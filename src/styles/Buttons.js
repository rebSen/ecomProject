import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #ffffff;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  font-size: 0.9em;
  border: 1px solid #c9c9c9;
  font-family: Raleway, sans-serif;
  &:hover {
    background: #bababa;
  }
  ${({ fond }) =>
    fond &&
    `
    background: #FFDDA3 ;
    border:none;
    float:right;
  `}
`;

export default Button;
