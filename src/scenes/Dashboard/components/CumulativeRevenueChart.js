import React from 'react';
import PropTypes from 'prop-types';
import {
  XAxis,
  FlexibleWidthXYPlot,
  LineSeries,
  HorizontalGridLines,
  YAxis
} from 'react-vis';
import { format, isSameDay } from 'date-fns';
import { CustomAxisLabel } from '_components';
import { cssConstants } from '_constants';

function yAxisTickFormat(tickValue) {
  if (tickValue >= 1000) {
    const thousands = tickValue / 1000;
    return `${thousands}K`;
  }

  return tickValue;
}

function xAxisTickFormat(t) {
  return format(new Date(t), 'MM/DD');
}

// https://github.com/uber/react-vis/issues/713 - need to find a good way to test this
export const CumulativeRevenueChart = ({
  height,
  data: { actual, projected }
}) => (
  <FlexibleWidthXYPlot height={height} style={{ padding: 10 }}>
    <HorizontalGridLines />
    <XAxis
      orientation="bottom"
      tickSize={0}
      tickFormat={xAxisTickFormat}
      tickTotal={10}
      tickPadding={10}
      style={{
        text: {
          fontWeight: 400,
          stroke: 'none',
          fill: cssConstants.PRIMARY_DARK_GRAY,
          fontSize: 10
        }
      }}
    />

    <YAxis
      tickFormat={yAxisTickFormat}
      tickSize={0}
      tickPadding={10}
      style={{
        line: { stroke: 'transparent' },
        text: {
          fontWeight: 400,
          stroke: 'none',
          fill: cssConstants.PRIMARY_DARK_GRAY,
          fontSize: 10
        }
      }}
    />

    <CustomAxisLabel title="Date" xAxis />
    <CustomAxisLabel title="Revenue" />

    <LineSeries
      data={actual}
      stroke={cssConstants.PRIMARY_LIGHT_BLUE}
      curve="curveMonotoneX"
      strokeWidth={2}
    />
    <LineSeries
      data={projected}
      stroke={cssConstants.PRIMARY_LIGHT_BLUE}
      curve="curveMonotoneX"
      strokeWidth={2}
      strokeDasharray="6 6"
    />
  </FlexibleWidthXYPlot>
);

CumulativeRevenueChart.propTypes = {
  height: PropTypes.number,
  data: PropTypes.shape({})
};
