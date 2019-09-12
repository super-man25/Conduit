import React from 'react';

export const MajorXAxisTick = ({ x, y, value }) => {
  return (
    <text x={x} y={y} style={{ fontSize: 12 }} textAnchor="middle">
      {value}
    </text>
  );
};

export const MajorXAxisTickLine = ({ x, y }) => (
  <path d={`M${x},${y}v${-38}`} stroke="#666" />
);
