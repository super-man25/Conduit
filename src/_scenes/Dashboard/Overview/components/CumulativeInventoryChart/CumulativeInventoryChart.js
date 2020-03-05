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
  Tooltip,
} from 'recharts';

import { chartLabelStyles, colors } from '_constants';
import { ChartContainer } from '_components';
import { CumulativeInventoryTooltip } from './CumulativeInventoryTooltip';
import { truncateNumber } from '_helpers/string-utils';
import type { EventStat } from '_models/eventStat';
import { isMobileDevice } from '_helpers';

const animationDuration = 1000;

type Props = {
  height: number,
  data: EventStat[],
  totalInventory: number,
  tooltipDateFormatter: (Date) => string,
  renderNoData: () => React.Node,
  majorXAxisTickRenderer: () => HTMLElement,
  minorXAxisTickRenderer: () => HTMLElement,
  mobileXAxisTickRenderer: () => HTMLElement,
};

export function CumulativeInventoryChart({
  height,
  data,
  totalInventory,
  tooltipDateFormatter,
  renderNoData,
  majorXAxisTickRenderer,
  minorXAxisTickRenderer,
  mobileXAxisTickRenderer,
}: Props) {
  if (!data.length) {
    return renderNoData();
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
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
            animationDuration={animationDuration}
            type="monotone"
            dataKey="inventory"
            name="actual"
            dot={false}
            strokeWidth={2}
            stroke={colors.blue}
          />

          <Line
            animationDuration={animationDuration}
            type="monotone"
            dataKey="projectedInventory"
            strokeDasharray="5 5"
            dot={false}
            name="projected"
            strokeWidth={2}
            stroke={colors.neonBlue}
          />
          <Tooltip
            cursor={{
              stroke: colors.gray,
              strokeWidth: 2,
              opacity: 0.25,
            }}
            content={
              <CumulativeInventoryTooltip
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
