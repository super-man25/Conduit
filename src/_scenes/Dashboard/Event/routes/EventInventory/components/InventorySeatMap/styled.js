import React from 'react';
import { Box, CenteredLoader } from '_components';
import styled from 'styled-components';

export const EventInventoryVerticalRule = Box.extend`
  background-color: #979797;
  cursor: pointer;
`;

export const SeatIcon = styled.img`
  cursor: pointer;
`;

export const SeatMapLoader = () => (
  <div style={{ position: 'relative', height: '100%', minHeight: 400 }}>
    <CenteredLoader />
  </div>
);
