// @flow
import React from 'react';
import { ChartTooltip } from '../ChartTooltip';
import { periodicTooltip } from '_helpers/chart-utils';

type TooltipContentProps = {
  active?: boolean,
  payload?: any,
  dateFormatter: (Date) => string,
};

export function PeriodicInventoryTooltip(props: TooltipContentProps) {
  const { active, dateFormatter, payload } = props;

  if (!active || !payload || !payload.length) {
    return null;
  }
  const [{ payload: stat }] = payload;
  const {
    periodicInventory,
    periodicRevenue,
    avgTicketPrice,
  } = periodicTooltip(stat);

  const headerText = dateFormatter(stat.timestamp);
  const bodyJson = {
    Inventory: periodicInventory,
    Revenue: periodicRevenue,
    'Avg. Ticket Price': avgTicketPrice,
  };

  return <ChartTooltip headerText={headerText} bodyJson={bodyJson} />;
}
