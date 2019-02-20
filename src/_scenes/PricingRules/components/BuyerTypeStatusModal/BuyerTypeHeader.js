import * as React from 'react';
import { Flex } from '_components';
import { FlexText } from './styled';

export function BuyerTypeHeader() {
  return (
    <Flex align="center">
      <FlexText basis="20%" weight={300}>
        Enabled
      </FlexText>
      <FlexText basis="20%" weight={300}>
        Code
      </FlexText>
      <FlexText basis="60%" weight={300}>
        Description
      </FlexText>
    </Flex>
  );
}
