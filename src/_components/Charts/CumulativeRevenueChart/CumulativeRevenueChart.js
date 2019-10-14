// @flow
import * as React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  Tooltip
} from 'recharts';
import { cssConstants, chartLabelStyles } from '_constants';
import { ChartContainer } from '_components';
import { truncateNumber } from '_helpers/string-utils';
import { CumulativeRevenueTooltip } from './CumulativeRevenueTooltip';
import type { EventStat } from '_models/eventStat';

const ANIMATION_DURATION = 1000;

type Props = {
  height: number,
  data: EventStat[],
  totalInventory: number,
  tooltipDateFormatter: (Date) => string,
  renderNoData: () => React.Node,
  majorXAxisTickRenderer: () => HTMLElement,
  minorXAxisTickRenderer: () => HTMLElement
};

export function CumulativeRevenueChart({
  height,
  data,
  totalInventory,
  tooltipDateFormatter,
  renderNoData,
  majorXAxisTickRenderer,
  minorXAxisTickRenderer
}: Props) {
  if (!data.length) {
    return renderNoData();
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <XAxis
            dataKey="timestamp"
            tick={minorXAxisTickRenderer}
            tickLine={false}
            interval={0}
            height={30}
          />
          <XAxis
            dataKey="timestamp"
            tick={majorXAxisTickRenderer}
            xAxisId="majorXAxis"
            axisLine={false}
            tickLine={false}
            interval={0}
            height={10}
          />

          <YAxis
            tickCount={10}
            tickFormatter={truncateNumber}
            tickLine={false}
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

          <CartesianGrid vertical={false} />

          <Line
            animationDuration={ANIMATION_DURATION}
            type="monotone"
            dataKey="revenue"
            name="actual"
            dot={false}
            strokeWidth={2}
            stroke={cssConstants.PRIMARY_BLUE}
          />

          <Line
            animationDuration={ANIMATION_DURATION}
            type="monotone"
            dataKey="projectedRevenue"
            strokeDasharray="5 5"
            dot={false}
            name="projected"
            strokeWidth={2}
            stroke={cssConstants.PRIMARY_LIGHT_BLUE}
          />
          <Tooltip
            cursor={{
              stroke: cssConstants.SECONDARY_BLUE,
              strokeWidth: 2,
              opacity: 0.5
            }}
            content={
              <CumulativeRevenueTooltip
                dateFormatter={tooltipDateFormatter}
                totalInventory={totalInventory}
              />
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
