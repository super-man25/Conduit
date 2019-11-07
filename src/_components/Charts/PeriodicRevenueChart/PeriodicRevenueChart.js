// @flow
import * as React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { cssConstants, chartLabelStyles } from '_constants';
import { ChartContainer } from '_components';
import { truncateNumber } from '_helpers/string-utils';
import { PeriodicRevenueTooltip } from './PeriodicRevenueTooltip';
import { isMobileDevice } from '_helpers';
import type { EventStat } from '_models/eventStat';

type Props = {
  height: number,
  data: EventStat[],
  renderNoData?: () => React.Node,
  tooltipDateFormatter: (Date) => string,
  majorXAxisTickRenderer: () => HTMLElement,
  minorXAxisTickRenderer: () => HTMLElement,
  mobileXAxisTickRenderer: () => HTMLElement
};

export const PeriodicRevenueChart = ({
  height,
  data,
  renderNoData,
  tooltipDateFormatter,
  majorXAxisTickRenderer,
  minorXAxisTickRenderer,
  mobileXAxisTickRenderer
}: Props) => {
  if (!data.length && renderNoData) {
    return renderNoData();
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={height} debounce={100}>
        <BarChart data={data}>
          <CartesianGrid vertical={false} />
          <ReferenceLine y={0} stroke={cssConstants.SECONDARY_BLUE} />
          {isMobileDevice && (
            <XAxis
              dataKey="timestamp"
              tick={mobileXAxisTickRenderer}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
          )}
          {!isMobileDevice && (
            <XAxis
              dataKey="timestamp"
              tick={minorXAxisTickRenderer}
              tickLine={false}
              interval={0}
              height={30}
            />
          )}
          {!isMobileDevice && (
            <XAxis
              dataKey="timestamp"
              tick={majorXAxisTickRenderer}
              xAxisId="majorXAxis"
              axisLine={false}
              tickLine={false}
              interval={0}
              height={10}
            />
          )}

          <YAxis
            tickCount={10}
            tickFormatter={truncateNumber}
            axisLine={false}
            tick={{ fontSize: 10 }}
            domain={['auto', 'auto']}
          >
            <Label
              value="Revenue"
              angle={-90}
              position="insideLeft"
              style={chartLabelStyles}
            />
          </YAxis>

          <Bar
            dataKey="periodicRevenue"
            stackId="a"
            fill={cssConstants.PRIMARY_BLUE}
          />

          <Bar
            dataKey="projectedPeriodicRevenue"
            stackId="a"
            fill={cssConstants.PRIMARY_LIGHT_BLUE}
          />

          <Tooltip
            cursor={{
              opacity: 0.4,
              fill: cssConstants.SECONDARY_BLUE
            }}
            animationDuration={500}
            content={
              <PeriodicRevenueTooltip dateFormatter={tooltipDateFormatter} />
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
