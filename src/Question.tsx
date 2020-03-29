import * as React from 'react';
import { useState } from 'react';
import {CSSProperties} from 'react';
import styled from 'styled-components'
import {generateBlockPair, fakeViewPortContainer, ElementChild, ElementPair} from './ElementPairGenerators';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Dropdown, {Option} from 'react-dropdown';
import 'react-dropdown/style.css';
import {Simulate} from "react-dom/test-utils";

const JSToCSS = (JS) => {
    let cssString = "";
    for (let objectKey in JS) {
        cssString += '\t' + objectKey.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`) + ": " + JS[objectKey] + ";\n";
    }

    return cssString;
};

export const Question = () => {
    const [pair, _] = useState<Partial<ElementPair>>(generateBlockPair(3));
    const [selectedValues, setSelectedValues] = useState({});

    let dropdownColorOptions: string[] = [];
    if (pair && pair.children) {
        dropdownColorOptions = pair.children.map(child => child.color.commonName);
    }

    const onAnswerOptionSelected = (selectedOption: Option, child: ElementChild) => {
        setSelectedValues({
            ...selectedValues,
            [child.color.commonName]: selectedOption.value
        })
    };

    const valuesWithSelections = Object.keys(selectedValues);
    const allCorrect = pair
                        && pair.children
                        && valuesWithSelections.length === pair.children.length
                        && valuesWithSelections.every(color => selectedValues[color] === color);

    return <QuestionContainer>
        <div style={fakeViewPortContainer}>
            <div style={pair.container}>
                {pair.children && pair.children.map((child: ElementChild, index: number) =>
                    <Box key={index}
                         style={child.style}
                         borderSize={3}
                         {...child.color}
                    >
                        Some text content
                    </Box>
                )}
            </div>
        </div>
        <OptionsContainer>
            {pair.children && pair.children.map((child: ElementChild, index: number) =>
            <AnswerOption key={index}>
                <FixedWidthDropdown
                    key={index}
                    placeholder="Select a box"
                    options={dropdownColorOptions}
                    value={selectedValues[child.color.commonName]}
                    onChange={(selectedValue) => onAnswerOptionSelected(selectedValue, child)}
                />
                <SyntaxHighlighter language="css" style={solarizedlight}>
                    {`.box${index} {\n${JSToCSS(child.style)}}`}
                </SyntaxHighlighter>
            </AnswerOption>
        )}
        </OptionsContainer>
        {allCorrect && <h1>Correct!</h1>}
    </QuestionContainer>
};

interface BoxProps {
    borderSize: number,
    darkColor: string,
    color: string,
    lightColor: string
}

const FixedWidthDropdown = styled(Dropdown)`
    width: 10rem;  
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
    /*margin: 0 2rem;*/
`;

const Box = styled.div<BoxProps>`
  position: relative;
  font-size: 1.7rem;
  color: white;
  font-family: 'Helvetica', sans-serif;
  /*width: 6rem;*/
  /*height: 6rem;*/
  /*padding: ${props => props.borderSize}px;*/
  
  /*outline: ${props => props.borderSize}px solid  ${props => props.darkColor};
  outline-offset: ${props => props.borderSize * -1}px;*/
  background-color: ${props => props.color};
`;

export default Question;