import React from 'react';
import logo from './logo.svg';
import './App.css';
import Question from "./Question";
import styled from "styled-components";

function App() {
  return (
    <React.Fragment>
      <Header>
        <ApplicationTitle>CSS Quiz</ApplicationTitle>
      </Header>
      <Question/>
    </React.Fragment>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 4rem 0;
`;

const ApplicationTitle = styled.div`
  font-size: 3rem;
  width: max-content;
`;

export default App;
