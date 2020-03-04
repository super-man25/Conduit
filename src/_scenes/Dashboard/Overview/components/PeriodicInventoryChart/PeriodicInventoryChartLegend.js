import React, { Fragment } from 'react';
import { colors } from '_constants';
import { ChartLegendItem } from '_components';

export function PeriodicInventoryChartLegend({ hasProjected }) {
  return (
    <Fragment>
      <ChartLegendItem
        color={colors.purple}
        label={hasProjected ? 'Actual Revenue' : 'Revenue'}
      />
      {hasProjected && (
        <ChartLegendItem color={colors.purple} label="Projected Inventory" />
      )}
    </Fragment>
  );
}
