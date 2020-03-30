import * as React from 'react';
import { useState } from 'react';
import {CSSProperties} from 'react';
import styled from 'styled-components'
import {generateBlockPair, ElementChild, ElementPair} from './ElementPairGenerators';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierEstuaryLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Dropdown, {Option} from 'react-dropdown';
import 'react-dropdown/style.css';
import {Simulate} from "react-dom/test-utils";
import Button from './Button'

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const JSToCSS = (JS) => {
  let cssString = "";
  for (let objectKey in JS) {
    cssString += '    ' + objectKey.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`) + ": " + JS[objectKey] + ";\n";
  }

  return cssString;
};

const QuestionResult = ({ checkedAnswer, allCorrect }) => {
  if (checkedAnswer) {
    if (allCorrect) {
      return <QuestionResultText>Correct</QuestionResultText>
    } else {
      return <QuestionResultText>Wrong</QuestionResultText>
    }
  } else {
    return null
  }
};

export const Question = () => {
  const [pair, _] = useState<Partial<ElementPair>>(generateBlockPair(4));
  // @ts-ignore
  const answerOptionOrder = [...pair.children];
  shuffle(answerOptionOrder);

  const [answerOptions] = useState<ElementChild[]>(answerOptionOrder);

  const [selectedValues, setSelectedValues] = useState({});
  const [checkedAnswer, setCheckedAnswer] = useState<boolean>(false);

  let dropdownColorOptions: string[] = [];
  if (pair && pair.children) {
    dropdownColorOptions = pair.children.map(child => child.color.commonName);
  }

  const onAnswerOptionSelected = (selectedOption: Option, child: ElementChild) => {
    setSelectedValues({
      ...selectedValues,
      [child.color.commonName]: selectedOption.value
    });
    setCheckedAnswer(false);
  };

  const valuesWithSelections = Object.keys(selectedValues);
  const allCorrect = pair
    && pair.children
    && valuesWithSelections.length === pair.children.length
    && valuesWithSelections.every(color => selectedValues[color] === color);

  const onCheckAnswersPressed = () => {
    setCheckedAnswer(true);
  };


  return <QuestionContainer>
    <FakeViewport>
      {pair.children && pair.children.map((child: ElementChild, index: number) =>
        <Box key={index}
             style={child.style}
             borderSize={3}
             {...child.color}
        >
          Some text content
        </Box>
      )}
    </FakeViewport>
    <OptionsContainer>
      {answerOptions.map((child: ElementChild, index: number) =>
        <AnswerOption key={index}>
          <AnswerOptionDropdown
            key={index}
            placeholder="Select the element"
            options={dropdownColorOptions}
            value={selectedValues[child.color.commonName]}
            onChange={(selectedValue) => onAnswerOptionSelected(selectedValue, child)}
          />
          <CssTextBox language="css" style={atelierEstuaryLight}>
            {`.box${index} {\n${JSToCSS(child.style)}}`}
          </CssTextBox>
        </AnswerOption>
      )}
      <QuestionActions>
        <QuestionResult checkedAnswer={checkedAnswer} allCorrect={allCorrect} />
        <Button onClick={onCheckAnswersPressed}>Check Answers</Button>
      </QuestionActions>
    </OptionsContainer>
  </QuestionContainer>
};

const QuestionResultText = styled.p`
  margin-right: 1rem;
`;

const QuestionActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CssTextBox = styled(SyntaxHighlighter)`
  width: 20rem;
  margin: 0 0 1rem 0;
`;

const FakeViewport = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%239f9f9f' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");
  position: relative;
  display: flow-root;
  width: 400px;
  height: 400px;
  border: 3px solid black;
`;

interface BoxProps {
  borderSize: number,
  darkColor: string,
  color: string,
  lightColor: string
}

const AnswerOptionDropdown = styled(Dropdown)`
  width: 13rem;
  margin-right: 1rem;
  align-self: flex-start;
`;

const AnswerOption = styled.div`
  display: flex;
  align-items: center;
`;

const QuestionContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const OptionsContainer = styled.div`
  margin: 0 2rem;
`;

const Box = styled.div<BoxProps>`
  position: relative;
  font-size: 1.7rem;
  color: white;
  font-family: 'Helvetica', sans-serif;
  
  background-color: ${props => props.color};
`;

export default Question;