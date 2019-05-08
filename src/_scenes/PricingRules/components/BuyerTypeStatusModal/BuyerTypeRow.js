// @flow

import * as React from 'react';
import { cssConstants } from '_constants';
import { Toggle, Flex } from '_components';
import { Icon } from '_components/Icon';
import { BuyerTypeOption, FlexText } from './styled';
import type { EDBuyerType } from '_models/buyerType';

type Props = {
  buyerType: EDBuyerType,
  onBuyerTypeToggle: (buyerType: EDBuyerType) => void,
  toggleDisabled: boolean
};

export function BuyerTypeRow({
  buyerType,
  onBuyerTypeToggle,
  toggleDisabled
}: Props) {
  return (
    <BuyerTypeOption align="center">
      <Flex
        title={
          toggleDisabled
            ? 'An active pricing rule is using this buyer type'
            : null
        }
        style={{ height: '25px' }}
        flexBasis="10%"
      >
        {toggleDisabled && (
          <Icon
            name="api-error"
            color={cssConstants.SECONDARY_BURNT_ORANGE}
            size={22}
          />
        )}
      </Flex>
      <Flex flexBasis="20%">
        <Toggle
          onChange={() => onBuyerTypeToggle(buyerType)}
          isChecked={!buyerType.disabled}
          size="small"
          isDisabled={toggleDisabled}
        />
      </Flex>
      <FlexText basis="20%">{buyerType.code}</FlexText>
      <FlexText basis="60%">{buyerType.publicDescription}</FlexText>
    </BuyerTypeOption>
  );
}
