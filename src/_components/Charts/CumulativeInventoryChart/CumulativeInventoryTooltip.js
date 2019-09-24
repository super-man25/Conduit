// @flow
import React from 'react';
import { ChartTooltip } from '../ChartTooltip';
import { cumulativeTooltip } from '_helpers/chart-utils';

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
  const [{ payload: stat }] = payload;
  const { inventory, revenue, avgTicketPrice } = cumulativeTooltip(stat);
  const headerText = dateFormatter(stat.timestamp);
  const bodyJson = {
    'Remaining Inventory': inventory,
    'Revenue To Date': revenue,
    'Avg. Ticket Price To Date': avgTicketPrice
  };

  return <ChartTooltip headerText={headerText} bodyJson={bodyJson} />;
}
