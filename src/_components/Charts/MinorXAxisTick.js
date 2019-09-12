import React from 'react';

export const MinorXAxisTick = ({ x, y, value }) => {
  return (
    <g>
      <path d={`M${x},${y + 5}v${-13}`} stroke="#666" />
      <text x={x + 5} y={y + 5} style={{ fontSize: 10 }} fill="#666">
        {value}
      </text>
    </g>
  );
};
