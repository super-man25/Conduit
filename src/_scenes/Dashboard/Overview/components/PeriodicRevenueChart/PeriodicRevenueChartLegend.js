import React, { Fragment } from 'react';
import { cssConstants } from '_constants';
import { ChartLegendItem } from '_components';

export function PeriodicRevenueChartLegend({ hasProjected }) {
  return (
    <Fragment>
      <ChartLegendItem
        label="Actual Revenue"
        color={cssConstants.PRIMARY_BLUE}
      />
      {hasProjected && (
        <ChartLegendItem
          label="Projected Revenue"
          color={cssConstants.PRIMARY_LIGHT_BLUE}
        />
      )}
    </Fragment>
  );
}
