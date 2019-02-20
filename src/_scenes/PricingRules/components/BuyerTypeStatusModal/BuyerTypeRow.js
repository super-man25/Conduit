// @flow

import * as React from 'react';
import { Toggle, Flex } from '_components';
import { BuyerTypeOption, FlexText } from './styled';
import type { EDBuyerType } from '_models/buyerType';

type Props = {
  buyerType: EDBuyerType,
  onBuyerTypeToggle: (buyerType: EDBuyerType) => void
};

export function BuyerTypeRow({ buyerType, onBuyerTypeToggle }: Props) {
  return (
    <BuyerTypeOption align="center">
      <Flex flexBasis="20%">
        <Toggle
          onChange={() => onBuyerTypeToggle(buyerType)}
          isChecked={!buyerType.disabled}
          size="small"
        />
      </Flex>
      <FlexText basis="20%">{buyerType.code}</FlexText>
      <FlexText basis="60%">{buyerType.publicDescription}</FlexText>
    </BuyerTypeOption>
  );
}
