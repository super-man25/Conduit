// @flow

import React from 'react';
import type { EDPricingPreview } from '_models/pricingPreview';
import { Table, Text } from '_components';
import { formatUSD } from '_helpers/string-utils';

type Props = {
  loading: boolean,
  pricingPreview?: EDPricingPreview
};

function formatStats(stats) {
  return {
    min: formatUSD(stats.min),
    max: formatUSD(stats.max)
  };
}

export const PricingPreview = (props: Props) => {
  const { loading, pricingPreview } = props;

  if (loading) {
    return <Text>Loading price preview...</Text>;
  }

  if (!pricingPreview || !pricingPreview.event || !pricingPreview.sections) {
    return <Text>Nothing to preview</Text>;
  }

  const data = [
    { label: 'Event', ...formatStats(pricingPreview.event) },
    ...Object.keys(pricingPreview.sections).map((section) => ({
      label: `Section ${section}`,
      ...formatStats(pricingPreview.sections[section])
    }))
  ];

  return (
    <Table
      columns={['label', 'min', 'max']}
      header={{
        label: '',
        min: 'Min Price',
        max: 'Max Price'
      }}
      data={data}
    />
  );
};
