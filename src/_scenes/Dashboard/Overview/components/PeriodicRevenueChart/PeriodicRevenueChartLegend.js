import React, { Fragment } from 'react';
import { colors } from '_constants';
import { ChartLegendItem } from '_components';

export function PeriodicRevenueChartLegend({ hasProjected }) {
  return (
    <Fragment>
      <ChartLegendItem
        label={hasProjected ? 'Actual Revenue' : 'Revenue'}
        color={colors.blue}
      />
      {hasProjected && (
        <ChartLegendItem label="Projected Revenue" color={colors.blue} />
      )}
    </Fragment>
  );
}
