// @flow
import React from 'react';
import { ChartTooltip } from '../ChartTooltip';

type TooltipProps = {
  active?: boolean,
  payload?: any,
  dateFormatter: (Date) => string,
};

export function EventScoreHistoryTooltip(props: TooltipProps) {
  const { active, dateFormatter, payload } = props;
  if (!active || !payload || !payload.length) {
    return null;
  }
  const [{ payload: stat }] = payload;
  const headerText = dateFormatter(stat.timestamp);
  const bodyJson = {
    'Event Score': stat.eventScore.toFixed(2),
  };

  return <ChartTooltip headerText={headerText} bodyJson={bodyJson} />;
}
