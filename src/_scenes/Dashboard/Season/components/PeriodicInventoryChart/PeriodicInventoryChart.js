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
import { PeriodicInventoryTooltip } from './PeriodicInventoryTooltip';
import type { EventStat } from '_models/eventStat';

const CHART_KEYS = {
  actual: 'periodicInventory',
  projected: 'projectedPeriodicInventory'
};

const CHART_INVENTORY_KEYS = {
  actualInventory: 'periodicInventory',
  projectedInventory: 'projectedPeriodicInventory'
};

function formatPeriodicInventoryData(data: EventStat[]) {
  return data.map(
    (d) => ({
      timestamp: d.timestamp,
      isProjected: d.isProjected,
      [d.isProjected
        ? CHART_INVENTORY_KEYS.projectedInventory
        : CHART_INVENTORY_KEYS.actualInventory]: d.periodicInventory
    }),
    []
  );
}

type Props = {
  height: number,
  data: EventStat[],
  renderNoData?: () => React.Node,
  dateFormat: string
};

export const PeriodicInventoryChart = ({
  height,
  data,
  renderNoData,
  dateFormat
}: Props) => {
  if (!data.length && renderNoData) {
    return renderNoData();
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={formatPeriodicInventoryData(data)}>
          <CartesianGrid vertical={false} />
          <ReferenceLine y={0} stroke={cssConstants.SECONDARY_BLUE} />

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
              value="Inventory"
              angle={-90}
              position="insideLeft"
              style={chartLabelStyles}
            />
          </YAxis>

          <Bar
            dataKey={CHART_KEYS.actual}
            stackId="a"
            fill={cssConstants.PRIMARY_DARK_BLUE}
          />
          <Bar
            dataKey={CHART_KEYS.projected}
            stackId="a"
            fill={cssConstants.PRIMARY_LIGHT_BLUE}
          />

          <Tooltip
            cursor={{
              fill: cssConstants.SECONDARY_LIGHT_BLUE,
              opacity: 0.4
            }}
            animationDuration={500}
            content={<PeriodicInventoryTooltip dateFormat={dateFormat} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
