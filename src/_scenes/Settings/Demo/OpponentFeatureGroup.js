import * as React from 'react';

import { Flex } from '_components';
import {
  FeatureGroupWrapper,
  FeatureGroupTitle,
  FeatureInputLabel,
} from './styled';
import { DemoDropdown } from './DemoDropdown';

export function OpponentFeatureGroup({
  selectedOpponentType,
  onOpponentTypeChange,
  optionsOpponentType,
  parseOption,
}) {
  return (
    <FeatureGroupWrapper>
      <FeatureGroupTitle>Opponent</FeatureGroupTitle>

      <Flex>
        <Flex direction="column" flexBasis={'40%'}>
          <FeatureInputLabel>Type</FeatureInputLabel>
          <DemoDropdown
            id="oppType"
            selected={selectedOpponentType}
            onChange={onOpponentTypeChange}
            options={optionsOpponentType}
            parseOption={parseOption}
          />
        </Flex>
      </Flex>
    </FeatureGroupWrapper>
  );
}
