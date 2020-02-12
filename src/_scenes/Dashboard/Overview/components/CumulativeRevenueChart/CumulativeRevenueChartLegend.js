import React, { Fragment } from 'react';
import { ChartLegendItem } from '_components';
import { cssConstants } from '_constants';

export function CumulativeRevenueChartLegend({ hasProjected }) {
  return (
    <Fragment>
      <ChartLegendItem label={hasProjected ? 'Actual Revenue' : 'Revenue'} />
      {hasProjected && (
        <ChartLegendItem
          dashed
          color={cssConstants.PRIMARY_LIGHT_BLUE}
          label="Projected Revenue"
        />
      )}
    </Fragment>
  );
}
