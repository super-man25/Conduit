// @flow
import React from 'react';
import { ChartTooltip } from '../ChartTooltip';
import { cumulativeTooltip } from '_helpers/chart-utils';

type TooltipContentProps = {
  active?: boolean,
  payload?: any,
  dateFormatter: (Date) => string,
  totalInventory: number,
};

export function CumulativeRevenueTooltip(props: TooltipContentProps) {
  const { active, dateFormatter, payload, totalInventory } = props;
  if (!active || !payload || !payload.length) {
    return null;
  }
  const [{ payload: stat }] = payload;
  const { inventory, revenue, avgTicketPrice } = cumulativeTooltip(
    stat,
    totalInventory
  );

  const headerText = dateFormatter(stat.timestamp);
  const bodyJson = {
    'Revenue To Date': revenue,
    'Remaining Inventory': inventory,
    'Avg. Ticket Price To Date': avgTicketPrice,
  };

  return <ChartTooltip headerText={headerText} bodyJson={bodyJson} />;
}
