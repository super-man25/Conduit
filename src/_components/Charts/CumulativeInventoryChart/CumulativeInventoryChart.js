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
import { CumulativeInventoryTooltip } from './CumulativeInventoryTooltip';
import { truncateNumber } from '_helpers/string-utils';
import type { EventStat } from '_models/eventStat';

const ANIMATION_DURATION = 1000;

const CHART_INVENTORY_KEYS = {
  actualInventory: 'inventory',
  projectedInventory: 'projectedInventory'
};

function formatCumulativeInventoryData(data: EventStat[]) {
  return data.map(
    (d) => ({
      timestamp: d.timestamp,
      isProjected: d.isProjected,
      [d.isProjected
        ? CHART_INVENTORY_KEYS.projectedInventory
        : CHART_INVENTORY_KEYS.actualInventory]: d.inventory
    }),
    []
  );
}

type Props = {
  height: number,
  data: EventStat[],
  dateFormatter: (Date) => string,
  renderNoData: () => React.Node
};

export function CumulativeInventoryChart({
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
        <LineChart data={formatCumulativeInventoryData(data)}>
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
              value="Inventory"
              angle={-90}
              position="insideLeft"
              style={chartLabelStyles}
            />
          </YAxis>

          <CartesianGrid vertical={false} />

          <Line
            animationDuration={ANIMATION_DURATION}
            type="monotone"
            dataKey="inventory"
            name="actual"
            dot={false}
            strokeWidth={2}
            stroke={cssConstants.SECONDARY_LIGHT_PURPLE}
          />

          <Line
            animationDuration={ANIMATION_DURATION}
            type="monotone"
            dataKey="projectedInventory"
            strokeDasharray="5 5"
            dot={false}
            name="projected"
            strokeWidth={2}
            stroke={cssConstants.SECONDARY_LIGHT_PURPLE}
          />
          <Tooltip
            cursor={{
              stroke: cssConstants.SECONDARY_LIGHT_PURPLE,
              strokeWidth: 2,
              opacity: 0.5
            }}
            content={
              <CumulativeInventoryTooltip dateFormatter={dateFormatter} />
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
