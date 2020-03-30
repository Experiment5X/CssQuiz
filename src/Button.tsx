import * as React from 'react';
import styled from "styled-components";

const Button = styled.button`
  padding: 0.5rem 1.5rem;
  letter-spacing: 0.12rem;
  height: max-content;
  
  font-size: 1.1rem;
  font-family: Helvetica, sans-serif;
  
  background-color: #378dbf;
  color: white;
  border: none;
  
  cursor: pointer;
  transition: color 0.5s;
  
  &:hover {
    background-color: #3184b5;
  }
  
  &:focus {
    outline: none;
  }
`;

export default Button;