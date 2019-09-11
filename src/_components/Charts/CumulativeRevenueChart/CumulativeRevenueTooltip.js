// @flow
import React from 'react';
import { ChartTooltip } from '../ChartTooltip';
import { formatUSD, formatNumber } from '_helpers/string-utils';

type TooltipContentProps = {
  active?: boolean,
  payload?: any,
  dateFormatter: (Date) => string
};

export function CumulativeRevenueTooltip(props: TooltipContentProps) {
  const { active, dateFormatter, payload } = props;
  if (!active || !payload || !payload.length) {
    return null;
  }
  const data = payload[0].payload;
  const headerText = dateFormatter(data.timestamp);
  const bodyJson = {
    'Revenue To Date': formatUSD(data.revenue),
    'Remaining Inventory': formatNumber(data.inventory),
    'Avg. Ticket Price To Date': formatUSD(data.revenue / data.inventory)
  };

  return <ChartTooltip headerText={headerText} bodyJson={bodyJson} />;
}
