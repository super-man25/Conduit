// @flow
import * as React from 'react';
import {
  ChartTooltip,
  TooltipHeaderText,
  TooltipBodyTitle,
  TooltipBodyText
} from '../ChartTooltip';

const CHART_KEYS = {
  actual: 'periodicInventory',
  projected: 'projectedPeriodicInventory'
};

type TooltipContentProps = {
  active?: boolean,
  payload?: any,
  dateFormatter: (Date) => string
};

export function PeriodicInventoryTooltip(props: TooltipContentProps) {
  const { payload, active, dateFormatter } = props;

  if (!active || !payload || !payload.length) {
    return null;
  }

  const dataPoint = payload.length && payload[0].payload;
  const bodyTitle = dataPoint.isProjected ? 'Projected Inventory' : 'Inventory';
  const bodyText = dataPoint.isProjected
    ? dataPoint[CHART_KEYS.projected]
    : dataPoint[CHART_KEYS.actual];

  const header = (
    <TooltipHeaderText>{dateFormatter(dataPoint.timestamp)}</TooltipHeaderText>
  );

  const body = (
    <React.Fragment>
      <TooltipBodyTitle>{bodyTitle}</TooltipBodyTitle>
      <TooltipBodyText>{bodyText}</TooltipBodyText>
    </React.Fragment>
  );

  return <ChartTooltip headerComponent={header} bodyComponent={body} />;
}
