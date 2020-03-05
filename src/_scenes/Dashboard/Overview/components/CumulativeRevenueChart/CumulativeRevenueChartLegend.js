import React, { Fragment } from 'react';
import { ChartLegendItem } from '_components';
import { colors } from '_constants';

export function CumulativeRevenueChartLegend({ hasProjected }) {
  return (
    <Fragment>
      <ChartLegendItem
        color={colors.blue}
        label={hasProjected ? 'Actual Revenue' : 'Revenue'}
      />
      {hasProjected && (
        <ChartLegendItem
          dashed
          color={colors.neonBlue}
          label="Projected Revenue"
        />
      )}
    </Fragment>
  );
}
