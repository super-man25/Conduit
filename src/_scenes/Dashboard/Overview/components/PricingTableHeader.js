// @flow
import React from 'react';
import { Box, Flex, Text } from '_components';
import { colors } from '_constants';

export const PricingTableHeader = (props: { headers: Array<string> }) => {
  const { headers } = props;
  return (
    <Flex direction="row" justify="flex-end">
      {headers.map((header, idx) => (
        <Box width="33%" key={idx}>
          <Text size={14} textAlign="right" color={colors.gray}>
            {header}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};
