// @flow
import React from 'react';
import {
  AreaSeries,
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  LineSeries,
  XAxis,
  YAxis
} from 'react-vis';
import { CustomAxisLabel } from '_components';
import { cssConstants } from '_constants';
import { getAxisTickOptions } from '_helpers/chart-utils';

// Currently colors are defined for 2 sets of colors. If a dataset with more than 2
// series comes through more colors can be added
const AreaSeriesColors = [
  {
    fill: 'rgba(56, 169, 219, 0.25)',
    stroke: cssConstants.SECONDARY_LIGHT_BLUE
  },
  {
    fill: 'rgba(129, 124, 184, 0.25)',
    stroke: cssConstants.SECONDARY_LIGHT_PURPLE
  }
];

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
  xAxisLabel: string,
  yAxisLabel: string,
  data: {
    [string]: ChartDataPoint[]
  }
};

// https://github.com/uber/react-vis/issues/713 - need to find a good way to test this
// TODO: Solve chart not adjusting width when the sidebar closes & Error/No Data state
export const CumulativeInventoryChart = ({
  height,
  data,
  xAxisLabel,
  yAxisLabel
}: Props) => (
  <FlexibleWidthXYPlot height={height} style={{ padding: 10 }}>
    <HorizontalGridLines />
    <XAxis
      orientation="bottom"
      tickSize={0}
      {...getAxisTickOptions(data)}
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

    <CustomAxisLabel title={xAxisLabel} xAxis />
    <CustomAxisLabel title={yAxisLabel} />

    {Object.values(data).map((series, index) => (
      <React.Fragment>
        <AreaSeries
          animation
          data={series}
          fill={AreaSeriesColors[index].fill}
          curve="curveMonotoneX"
          stroke="transparent"
          strokeWidth={0}
        />
        <LineSeries
          data={series}
          stroke={AreaSeriesColors[index].stroke}
          curve="curveMonotoneX"
          strokeWidth={2}
        />
      </React.Fragment>
    ))}
  </FlexibleWidthXYPlot>
);
