// @flow
import React from 'react';
import { ChartTooltip } from '../ChartTooltip';
import { formatUSD, formatNumber } from '_helpers/string-utils';

type TooltipContentProps = {
  active?: boolean,
  payload?: any,
  dateFormatter: (Date) => string
};

export function PeriodicRevenueTooltip(props: TooltipContentProps) {
  const { active, dateFormatter, payload } = props;
  if (!active || !payload || !payload.length) {
    return null;
  }
  const data = payload[0].payload;
  const headerText = dateFormatter(data.timestamp);
  const bodyJson = {
    Revenue: formatUSD(data.periodicRevenue),
    Inventory: formatNumber(data.periodicInventory),
    'Avg. Ticket Price': formatUSD(
      data.periodicRevenue / (data.periodicInventory * -1)
    )
  };

  return <ChartTooltip headerText={headerText} bodyJson={bodyJson} />;
}
