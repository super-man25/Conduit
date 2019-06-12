// @flow
import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, H4, Icon, Popover, Text } from '_components';
import { cssConstants } from '_constants';
import { formatUSD } from '_helpers/string-utils';
import { PricingTableHeader } from './PricingTableHeader';
import type { EDPricingPreview } from '_models/pricingPreview';
import type { Node } from 'react';

const Row = styled(Flex)`
  border-bottom: 1px solid ${cssConstants.PRIMARY_LIGHTER_GRAY};
  :last-child {
    border-bottom: none;
  }
`;
const PricingPreviewText = ({
  children,
  color
}: {
  children: Node,
  color?: string
}) => (
  <Flex align="center" justify="center" margin="auto">
    <Text color={color}>{children}</Text>
  </Flex>
);

type Props = {
  loading: boolean,
  pricingPreview?: EDPricingPreview
};

export const PricingPreview = (props: Props) => {
  const { loading, pricingPreview } = props;

  const [isOpen, setIsOpen] = useState(false);

  const formatStats = (stats: { min: number, max: number }) => {
    const { min, max } = stats;
    return {
      min: formatUSD(min),
      max: formatUSD(max)
    };
  };

  if (loading) {
    return (
      <PricingPreviewText color={cssConstants.PRIMARY_BLUE}>
        Loading Price Preview...
      </PricingPreviewText>
    );
  }

  if (!pricingPreview || !pricingPreview.event || !pricingPreview.sections) {
    return (
      <PricingPreviewText color={cssConstants.PRIMARY_GRAY}>
        No Price Preview
      </PricingPreviewText>
    );
  }

  const data = [
    { label: 'EVENT', ...formatStats(pricingPreview.event) },
    ...Object.keys(pricingPreview.sections).map((section) => ({
      label: `SECTION ${section}`,
      ...formatStats(pricingPreview.sections[section])
    }))
  ];

  return (
    <Fragment>
      <Flex>
        <H4 margin="0.5rem 0.5rem 0 0">Preview</H4>
        <Popover
          placement="top"
          isOpen={isOpen}
          arrowOffset="-0.9rem"
          target={
            <Box
              margin="0.5rem 0"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <Icon name="info" color={cssConstants.PRIMARY_BLUE} size={22} />
            </Box>
          }
        >
          The preview is calculated off the final values from Event Score and
          Spring value in relation to modifiers that are entered.
        </Popover>
      </Flex>
      <Box padding="10px">
        <PricingTableHeader headers={['MIN PRICE', 'MAX PRICE']} />
        {data.map((row, idx) => (
          <Row
            padding="14px 0"
            direction="row"
            minHeight="36px"
            align="center"
            key={idx}
          >
            <Box width="33%">
              <Text color={cssConstants.PRIMARY_GRAY}>{row.label}</Text>
            </Box>
            <Box width="33%">
              <Text
                weight="heavy"
                textAlign="right"
                color={cssConstants.PRIMARY_BLUE}
              >
                {row.min}
              </Text>
            </Box>
            <Box width="33%">
              <Text
                weight="heavy"
                textAlign="right"
                color={cssConstants.PRIMARY_BLUE}
              >
                {row.max}
              </Text>
            </Box>
          </Row>
        ))}
      </Box>
    </Fragment>
  );
};
