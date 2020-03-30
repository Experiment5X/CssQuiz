import * as React from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { ColorCombo } from "./ElementPairGenerators";

interface ColorSelectorProps {
  colors: ColorCombo[]
  onChange?: (colorSelected: ColorCombo) => void
}

const ColorSelector = ({ colors , onChange }: ColorSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const onColorItemClicked = (colorClicked: ColorCombo) => {
    setSelectedColor(colorClicked.commonName);

    if (onChange) {
      onChange(colorClicked);
    }
  };

  return <Container>
    {colors.map((color: ColorCombo) =>
      <ColorItem
        color={color}
        selected={selectedColor === color.commonName}
        onClick={() => onColorItemClicked(color)}
      />
    )}
  </Container>
};

const Container = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: row;
`;

interface ColorItemProps {
  color: any
  selected: boolean
}

const ColorItem = styled.div<ColorItemProps>`
  box-sizing: border-box;

  margin: 0 0.3rem;
  width: 1.5rem;
  height: 1.5rem;

  cursor: pointer;
  background-color: ${props => props.color.color};

  transition: border 0.15s;

  &:hover {
    background-color: ${props => props.color.shadeColor};
  }

  ${props => props.selected ? css`border: 0.25rem solid ${props.color.darkColor};` : null}
`;

export default ColorSelector;