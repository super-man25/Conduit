// @flow

import * as React from 'react';
import styled from 'styled-components';

type Props = {
  cols: number,
  width: string,
  margin: string,
  columns: string // override for css grid-template-columns
};

export const Setting: React.ComponentType<Props> = styled.div.attrs({
  columns: (props) => {
    const cols = props.cols || 2;
    return `repeat(${cols}, 1fr)`;
  }
})`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  width: ${(props) => props.width || '100%'};
  margin: ${(props) => props.margin || 0};
`;

export default Setting;
