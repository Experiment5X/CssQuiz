import * as React from 'react'
import styled from 'styled-components'


const LabeledContainer = styled.div<{ label: string }>`
  position: relative;
  border: 1px solid black;

  &::before {
    position: absolute;
    left: 0;
    top: -0.95rem;
    
    content: '${props => props.label}';
    color: black;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

export default LabeledContainer;