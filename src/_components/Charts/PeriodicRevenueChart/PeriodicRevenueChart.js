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
import { format } from 'date-fns';
import { ChartContainer } from '_components';
import { truncateNumber } from '_helpers/string-utils';
import { PeriodicRevenueTooltip } from './PeriodicRevenueTooltip';
import type { EventStat } from '_models/eventStat';

const CHART_KEYS = {
  actual: 'periodicRevenue',
  projected: 'projectedPeriodicRevenue'
};

const CHART_REVENUE_KEYS = {
  actualRevenue: 'periodicRevenue',
  projectedRevenue: 'projectedPeriodicRevenue'
};

function formatPeriodicRevenueData(data: EventStat[]) {
  return data.map(
    (d) => ({
      timestamp: d.timestamp,
      isProjected: d.isProjected,
      [d.isProjected
        ? CHART_REVENUE_KEYS.projectedRevenue
        : CHART_REVENUE_KEYS.actualRevenue]: d.periodicRevenue
    }),
    []
  );
}

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
        <BarChart data={formatPeriodicRevenueData(data)}>
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
            dataKey={CHART_KEYS.actual}
            stackId="a"
            fill={cssConstants.PRIMARY_BLUE}
          />

          <Bar
            dataKey={CHART_KEYS.projected}
            stackId="a"
            fill={cssConstants.PRIMARY_LIGHT_BLUE}
          />

          <Tooltip
            cursor={{
              opacity: 0.4,
              fill: cssConstants.SECONDARY_LIGHT_BLUE
            }}
            animationDuration={500}
            content={<PeriodicRevenueTooltip dateFormatter={dateFormatter} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
