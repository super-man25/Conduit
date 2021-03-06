import React from 'react';
import { Box, Loader } from '_components';
import styled from 'styled-components';

export const SeatMapObject = styled.object`
  width: 100%;
  max-width: 500px;
`;

export const EventInventoryVerticalRule = styled(Box)`
  background-color: #979797;
  cursor: pointer;
`;

export const SeatIcon = styled.img`
  cursor: pointer;
`;

export const SeatMapLoader = () => (
  <div style={{ position: 'relative', height: '100%', minHeight: 400 }}>
    <Loader centered />
  </div>
);
