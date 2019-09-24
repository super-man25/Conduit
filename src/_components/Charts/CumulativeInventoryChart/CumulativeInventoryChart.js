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

type Props = {
  height: number,
  data: EventStat[],
  tooltipDateFormatter: (Date) => string,
  renderNoData: () => React.Node,
  majorXAxisTickRenderer: () => HTMLElement,
  minorXAxisTickRenderer: () => HTMLElement
};

export function CumulativeInventoryChart({
  height,
  data,
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
            stroke={cssConstants.SECONDARY_PURPLE}
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
              <CumulativeInventoryTooltip
                dateFormatter={tooltipDateFormatter}
              />
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
