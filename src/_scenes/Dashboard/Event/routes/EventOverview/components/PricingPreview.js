// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, H4, Icon, Popover, Text } from '_components';
import { cssConstants } from '_constants';
import { formatUSD } from '_helpers/string-utils';
import { PendingFactors } from '_models';
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
  record: ?EDPricingPreview,
  error: ?Error,
  springError: ?Error,
  pendingFactors: PendingFactors
};

export const PricingPreview = (props: Props) => {
  const {
    error,
    loading,
    record: pricingPreview,
    springError,
    pendingFactors: { eventScore }
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const formatStats = (stats: { min: number, max: number }) => {
    const { min, max } = stats;
    return {
      min: formatUSD(min),
      max: formatUSD(max)
    };
  };

  let preview = null;

  if (loading) {
    preview = (
      <Flex align="center" justify="center" margin="auto">
        <Text color={cssConstants.PRIMARY_BLUE}>Loading Price Preview...</Text>
      </Flex>
    );
  } else if (!eventScore) {
    preview = (
      <PricingPreviewText color={cssConstants.PRIMARY_GRAY}>
        The pricing preview section will be available once the event has been
        priced.
      </PricingPreviewText>
    );
  } else if (springError || error) {
    preview = (
      <Flex
        align="center"
        justify="center"
        margin="auto"
        direction="column"
        width="50%"
      >
        <Icon name="api-error" color={cssConstants.SECONDARY_RED} size={24} />
        <Text color={cssConstants.PRIMARY_RED} textAlign="center">
          A server error has occurred, please contact{' '}
          <a
            style={{
              color: cssConstants.PRIMARY_RED,
              fontWeight: 'bold'
            }}
            href="mailto:support@eventdynamic.com"
          >
            support@eventdynamic.com.
          </a>
        </Text>
      </Flex>
    );
  } else if (
    !pricingPreview ||
    !pricingPreview.event ||
    !pricingPreview.sections
  ) {
    preview = (
      <PricingPreviewText color={cssConstants.PRIMARY_GRAY}>
        No Price Preview
      </PricingPreviewText>
    );
  } else {
    const data = [
      { label: 'EVENT', ...formatStats(pricingPreview.event) },
      ...Object.keys(pricingPreview.sections).map((section) => ({
        label: `SECTION ${section}`,
        ...formatStats(pricingPreview.sections[section])
      }))
    ];

    preview = (
      <Box padding="1.5rem">
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
                className="private"
              >
                {row.min}
              </Text>
            </Box>
            <Box width="33%">
              <Text
                weight="heavy"
                textAlign="right"
                color={cssConstants.PRIMARY_BLUE}
                className="private"
              >
                {row.max}
              </Text>
            </Box>
          </Row>
        ))}
      </Box>
    );
  }

  return (
    <Flex direction="column" padding="0 20px" width="100%">
      <Flex align="center">
        <H4 margin="0.5rem 1rem 0.5rem 0">Preview</H4>
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
      {preview}
    </Flex>
  );
};
