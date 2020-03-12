import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-weight: bold;
`;

const Row = ({ style, columns, ...rest }) => (
  <StyledHeader style={style}>{columns}</StyledHeader>
);

export const headerRenderer = (props) => <Row {...props} />;
