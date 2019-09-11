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
import type { EventStat } from '_models/eventStat';

type Props = {
  height: number,
  data: EventStat[],
  renderNoData?: () => React.Node,
  dateFormatter: (Date) => string
};

export const PeriodicRevenueChart = ({
  height,
  data,
  renderNoData,
  dateFormatter
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
            content={<PeriodicRevenueTooltip dateFormatter={dateFormatter} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
