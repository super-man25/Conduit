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
import { format } from 'date-fns';
import { ChartContainer } from '_components';
import { truncateNumber } from '_helpers/string-utils';
import { CumulativeRevenueTooltip } from './CumulativeRevenueTooltip';
import type { EventStat } from '_models/eventStat';

const ANIMATION_DURATION = 1000;

const CHART_REVENUE_KEYS = {
  actualRevenue: 'revenue',
  projectedRevenue: 'projectedRevenue'
};

function formatCumulativeRevenueData(data: EventStat[]) {
  return data.map(
    (d) => ({
      timestamp: d.timestamp,
      isProjected: d.isProjected,
      [d.isProjected
        ? CHART_REVENUE_KEYS.projectedRevenue
        : CHART_REVENUE_KEYS.actualRevenue]: d.revenue
    }),
    []
  );
}

type Props = {
  height: number,
  data: EventStat[],
  dateFormat: string,
  renderNoData: () => React.Node
};

export function CumulativeRevenueChart({
  height,
  data,
  dateFormat,
  renderNoData,
  dataKeys
}: Props) {
  if (!data.length) {
    return renderNoData();
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={formatCumulativeRevenueData(data)}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(tick) => format(tick, dateFormat)}
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
            stroke={cssConstants.PRIMARY_LIGHT_BLUE}
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
              stroke: cssConstants.PRIMARY_LIGHT_BLUE,
              strokeWidth: 2,
              opacity: 0.5
            }}
            content={<CumulativeRevenueTooltip dateFormat={dateFormat} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
