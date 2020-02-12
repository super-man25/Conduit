import React from 'react';

import { isMobileDevice } from '_helpers';

export const MajorXAxisTick = ({ x, y, value }) => {
  return (
    <text
      x={x}
      y={isMobileDevice ? y + 10 : y}
      style={{ fontSize: 12 }}
      textAnchor="middle"
    >
      {value}
    </text>
  );
};

export const MajorXAxisTickLine = ({ x, y }) =>
  isMobileDevice ? (
    <path d={`M${x},${y + 10}v${-18}`} stroke="#666" />
  ) : (
    <path d={`M${x},${y}v${-38}`} stroke="#666" />
  );
