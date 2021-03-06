// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, H4, Icon, Text } from '_components';
import { colors } from '_constants';
import { formatUSD } from '_helpers/string-utils';
import { PendingFactors } from '_models';
import { PricingTableHeader } from './PricingTableHeader';
import type { EDPricingPreview } from '_models/pricingPreview';
import type { Node } from 'react';

const Row = styled(Flex)`
  border-bottom: 1px solid ${colors.lightGray};

  &:last-child {
    border-bottom: none;
  }
`;

const HoverTipContainer = styled(Box)`
  position: relative;
  width: 22px;
`;

const HoverTip = styled.div`
  position: absolute;
  bottom: 100%;
  left: -64px; /* (150px / 2) - (22px / 2) * -1 */
  background-color: ${colors.blue};
  color: white;
  border-radius: 10px;
  padding: 10px;
  width: 150px;
  font-size: 10px;

  ${({ isOpen }) =>
    isOpen ||
    `
    display: none;
  `}
`;

const PricingPreviewText = ({
  children,
  color,
}: {
  children: Node,
  color?: string,
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
  pendingFactors: PendingFactors,
};

export const PricingPreview = (props: Props) => {
  const {
    error,
    loading,
    record: pricingPreview,
    springError,
    pendingFactors: { eventScore },
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const formatStats = (stats: { min: number, max: number }) => {
    const { min, max } = stats;
    return {
      min: formatUSD(min),
      max: formatUSD(max),
    };
  };

  let preview = null;

  if (loading) {
    preview = (
      <Flex align="center" justify="center" margin="auto">
        <Text color={colors.blue}>Loading Price Preview...</Text>
      </Flex>
    );
  } else if (!eventScore) {
    preview = (
      <PricingPreviewText color={colors.gray}>
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
        <Icon name="apiError" color={colors.red} size={24} />
        <Text color={colors.red} textAlign="center">
          A server error has occurred, please contact{' '}
          <a
            style={{
              color: colors.red,
              fontWeight: 'bold',
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
      <PricingPreviewText color={colors.gray}>
        No Price Preview
      </PricingPreviewText>
    );
  } else {
    const data = [
      { label: 'Event', ...formatStats(pricingPreview.event) },
      ...Object.keys(pricingPreview.sections).map((section) => ({
        label: `Section ${section}`,
        ...formatStats(pricingPreview.sections[section]),
      })),
    ];

    preview = (
      <Box padding="1.5rem">
        <PricingTableHeader headers={['Min Price', 'Max Price']} />
        {data.map((row, idx) => (
          <Row
            padding="14px 0"
            direction="row"
            minHeight="36px"
            align="center"
            key={idx}
          >
            <Box width="33%">
              <Text color={colors.gray}>{row.label}</Text>
            </Box>
            <Box width="33%">
              <Text
                weight="heavy"
                textAlign="right"
                color={colors.blue}
                className="private"
              >
                {row.min}
              </Text>
            </Box>
            <Box width="33%">
              <Text
                weight="heavy"
                textAlign="right"
                color={colors.blue}
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
    <Flex direction="column" padding="25px" width="100%">
      <Flex align="center">
        <H4 margin="0 5px 0 0">Preview</H4>
        <HoverTipContainer
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Icon name="info" color={colors.blue} size={22} />
          <HoverTip isOpen={isOpen}>
            The preview is calculated off the final values from Event Score and
            Spring value in relation to modifiers that are entered.
          </HoverTip>
        </HoverTipContainer>
      </Flex>
      {preview}
    </Flex>
  );
};
