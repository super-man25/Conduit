// @flow
import React from 'react';
import { ChartTooltip } from '../ChartTooltip';
import { formatUSD, formatNumber } from '_helpers/string-utils';

type TooltipContentProps = {
  active?: boolean,
  payload?: any,
  dateFormatter: (Date) => string
};

export function CumulativeInventoryTooltip(props: TooltipContentProps) {
  const { active, dateFormatter, payload } = props;
  if (!active || !payload || !payload.length) {
    return null;
  }
  const data = payload[0].payload;
  const headerText = dateFormatter(data.timestamp);
  const bodyJson = {
    'Remaining Inventory': formatNumber(data.inventory),
    'Revenue To Date': formatUSD(data.revenue),
    'Avg. Ticket Price To Date': formatUSD(data.revenue / data.inventory)
  };

  return <ChartTooltip headerText={headerText} bodyJson={bodyJson} />;
}
