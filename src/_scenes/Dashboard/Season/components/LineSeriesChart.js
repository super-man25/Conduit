// @flow
import React from 'react';
import {
  XAxis,
  FlexibleWidthXYPlot,
  LineSeries,
  HorizontalGridLines,
  YAxis
} from 'react-vis';
import { CustomAxisLabel } from '_components';
import { cssConstants } from '_constants';
import { getAxisTickOptions, getChartRange } from '_helpers/chart-utils';

function yAxisTickFormat(tickValue: number): string {
  if (tickValue >= 1000) {
    const thousands = tickValue / 1000;
    return `${thousands}K`;
  }

  return '' + tickValue;
}

type ChartDataPoint = {
  x: Date,
  y: number
};

type Props = {
  height: number,
  data: {
    actual: ChartDataPoint[],
    projected: ChartDataPoint[]
  },
  xAxisLabel: string,
  yAxisLabel: string
};

// https://github.com/uber/react-vis/issues/713 - need to find a good way to test this
// TODO: Solve chart not adjusting width when the sidebar closes & Error/No Data state
export const LineSeriesChart = ({
  height,
  data: { actual, projected },
  xAxisLabel,
  yAxisLabel
}: Props) => {
  return (
    <FlexibleWidthXYPlot
      height={height}
      style={{ padding: 10 }}
      yDomain={getChartRange({ actual, projected })}
    >
      <HorizontalGridLines />

      <XAxis
        orientation="bottom"
        tickSize={0}
        tickPadding={10}
        {...getAxisTickOptions({ actual, projected })}
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

      <CustomAxisLabel title={xAxisLabel} xAxis />
      <CustomAxisLabel title={yAxisLabel} />

      <LineSeries
        data={actual}
        animation
        stroke={cssConstants.PRIMARY_LIGHT_BLUE}
        curve="curveMonotoneX"
        strokeWidth={2}
      />
      <LineSeries
        data={projected}
        animation
        stroke={cssConstants.PRIMARY_LIGHT_BLUE}
        curve="curveMonotoneX"
        strokeWidth={2}
        strokeDasharray="6 6"
      />
    </FlexibleWidthXYPlot>
  );
};
