// @flow
import * as React from 'react';
import {
  ChartTooltip,
  TooltipHeaderText,
  TooltipBodyTitle,
  TooltipBodyText
} from '../ChartTooltip';

type TooltipContentProps = {
  active?: boolean,
  payload?: any,
  dateFormatter: (Date) => string
};

export function CumulativeInventoryTooltip(props: TooltipContentProps) {
  const { payload, active, dateFormatter } = props;

  if (!active || !payload || !payload.length) {
    return null;
  }

  const dataPoint = payload.length && payload[0].payload;
  const bodyTitle = dataPoint.isProjected ? 'Projected Inventory' : 'Inventory';
  const bodyText = dataPoint.isProjected
    ? dataPoint.projectedInventory
    : dataPoint.inventory;

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
