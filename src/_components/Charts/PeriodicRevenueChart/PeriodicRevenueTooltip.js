// @flow
import * as React from 'react';
import {
  ChartTooltip,
  TooltipHeaderText,
  TooltipBodyTitle,
  TooltipBodyText
} from '../ChartTooltip';
import { formatUSD } from '_helpers/string-utils';

const CHART_KEYS = {
  actual: 'periodicRevenue',
  projected: 'projectedPeriodicRevenue'
};

type TooltipContentProps = {
  active?: boolean,
  payload?: any,
  dateFormatter: (Date) => string
};

export function PeriodicRevenueTooltip(props: TooltipContentProps) {
  const { payload, active, dateFormatter } = props;

  if (!active || !payload || !payload.length) {
    return null;
  }

  const dataPoint = payload.length && payload[0].payload;
  const bodyTitle = dataPoint.isProjected ? 'Projected Revenue' : 'Revenue';
  const bodyText = formatUSD(
    dataPoint.isProjected
      ? dataPoint[CHART_KEYS.projected]
      : dataPoint[CHART_KEYS.actual]
  );

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
