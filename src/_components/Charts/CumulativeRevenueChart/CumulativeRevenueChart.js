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
  dateFormatter: (Date) => string,
  renderNoData: () => React.Node
};

export function CumulativeRevenueChart({
  height,
  data,
  dateFormatter,
  renderNoData
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
            tickFormatter={dateFormatter}
            tick={{ fontSize: 10 }}
          >
            <Label
              value="Date"
              position="insideBottom"
              style={chartLabelStyles}
              offset={-5}
            />
          </XAxis>

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
            stroke={cssConstants.PRIMARY_BLUE}
          />
          <Tooltip
            cursor={{
              stroke: cssConstants.SECONDARY_BLUE,
              strokeWidth: 2,
              opacity: 0.5
            }}
            content={<CumulativeRevenueTooltip dateFormatter={dateFormatter} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
