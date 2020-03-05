import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Label,
  Line,
  Tooltip,
} from 'recharts';

import { truncateNumber, isMobileDevice } from '_helpers';
import { chartLabelStyles, colors } from '_constants';
import { ChartContainer } from '_components/ChartContainer';
import { EventScoreHistoryTooltip } from './EventScoreHistoryTooltip';

const animationDuration = 1000;

export const EventScoreHistoryChart = ({
  height,
  data,
  renderNoData,
  tooltipDateFormatter,
  majorXAxisTickRenderer,
  minorXAxisTickRenderer,
  mobileXAxisTickRenderer,
}) => {
  if (!data.length) {
    return renderNoData();
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={height} debounce={100}>
        <LineChart data={data}>
          <CartesianGrid vertical={false} />
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
              value="Event Score"
              angle={-90}
              position="insideLeft"
              style={chartLabelStyles}
            />
          </YAxis>
          <Line
            dataKey="eventScore"
            animationDuration={animationDuration}
            type="stepAfter"
            dot={false}
            strokeWidth={2}
            stroke={colors.blue}
          />
          <Tooltip
            cursor={{
              stroke: colors.gray,
              strokeWidth: 2,
              opacity: 0.25,
            }}
            content={
              <EventScoreHistoryTooltip dateFormatter={tooltipDateFormatter} />
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
