// @flow
import * as React from 'react';
import {
  ChartTooltip,
  TooltipHeaderText,
  TooltipBodyTitle,
  TooltipBodyText
} from '../ChartTooltip';
import { format } from 'date-fns';
import { DATE_FORMATS } from '_constants';

type TooltipContentProps = {
  active?: boolean,
  payload?: any,
  dateFormat: string
};

export function CumulativeInventoryTooltip(props: TooltipContentProps) {
  const { payload, active, dateFormat } = props;

  if (!active || !payload || !payload.length) {
    return null;
  }

  const dataPoint = payload.length && payload[0].payload;
  const bodyTitle = dataPoint.isProjected ? 'Projected Inventory' : 'Inventory';
  const bodyText = dataPoint.isProjected
    ? dataPoint.projectedInventory
    : dataPoint.inventory;

  const header =
    dateFormat === DATE_FORMATS.day ? (
      <TooltipHeaderText>
        {format(dataPoint.timestamp, dateFormat)}
      </TooltipHeaderText>
    ) : (
      <React.Fragment>
        <TooltipHeaderText>
          {format(dataPoint.timestamp, DATE_FORMATS.day)}
        </TooltipHeaderText>
        <TooltipHeaderText>
          {format(dataPoint.timestamp, DATE_FORMATS.time)}
        </TooltipHeaderText>
      </React.Fragment>
    );

  const body = (
    <React.Fragment>
      <TooltipBodyTitle>{bodyTitle}</TooltipBodyTitle>
      <TooltipBodyText>{bodyText}</TooltipBodyText>
    </React.Fragment>
  );

  return <ChartTooltip headerComponent={header} bodyComponent={body} />;
}
