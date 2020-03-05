import React, { Fragment } from 'react';
import { colors } from '_constants';
import { ChartLegendItem } from '_components';

export function PeriodicInventoryChartLegend({ hasProjected }) {
  return (
    <Fragment>
      <ChartLegendItem
        color={colors.blue}
        label={hasProjected ? 'Actual Inventory' : 'Inventory'}
      />
      {hasProjected && (
        <ChartLegendItem color={colors.neonBlue} label="Projected Inventory" />
      )}
    </Fragment>
  );
}
