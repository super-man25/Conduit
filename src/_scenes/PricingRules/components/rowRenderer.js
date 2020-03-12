import React from 'react';
import styled from 'styled-components';

import { colors } from '_constants';

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ even }) => even && colors.whiteSmoke};
`;

const Row = ({ style, columns, index, ...rest }) => (
  <StyledRow style={style} even={index % 2 === 0}>
    {columns}
  </StyledRow>
);

export const rowRenderer = (props) => <Row {...props} />;
