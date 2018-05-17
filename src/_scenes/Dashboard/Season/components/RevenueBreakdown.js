// @flow
import React, { Fragment } from 'react';
import { P1, Spacing, HorizontalBars, LegendItem } from '_components';

type RevenueBreakdownProps = {
  data: number[],
  colors: string[]
};

export const RevenueBreakdown = ({ data, colors }: RevenueBreakdownProps) => (
  <Fragment>
    <P1>Revenue Breakdown</P1>
    <Spacing height="12px" />
    <HorizontalBars data={data} colors={colors} />
    <Spacing height="12px" />
    <div>
      <LegendItem label="Single Game" value="$9504.13" color="#144670" />
      <LegendItem label="Group Tickets" value="$9504.13" color="#4B98CF" />
      <LegendItem label="Single Suites" value="$9504.13" color="#2670AE" />
      <LegendItem label="Season Tickets" value="$9504.13" color="#C4D2E1" />
    </div>
  </Fragment>
);
