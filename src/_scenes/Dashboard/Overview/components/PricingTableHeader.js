// @flow
import React from 'react';
import { Box, Flex, Text } from '_components';
import { cssConstants } from '_constants';

export const PricingTableHeader = (props: { headers: Array<string> }) => {
  const { headers } = props;
  return (
    <Flex direction="row" justify="flex-end">
      {headers.map((header, idx) => (
        <Box width="33%" key={idx}>
          <Text size={14} textAlign="right" color={cssConstants.PRIMARY_GRAY}>
            {header}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};
