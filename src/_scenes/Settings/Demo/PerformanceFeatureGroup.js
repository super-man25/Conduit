import * as React from 'react';

import { Flex, Spacing, Text } from '_components';
import {
  FeatureGroupWrapper,
  SoupedUpSlider,
  FeatureGroupTitle
} from './styled';

export function PerformanceFeatureGroup({
  gamesAhead,
  onGamesAheadChange,
  winLossRatio,
  onWinLossRatioChange
}) {
  return (
    <FeatureGroupWrapper>
      <FeatureGroupTitle>Performance</FeatureGroupTitle>

      <Flex justify="space-between">
        <Flex direction="column" flexBasis={'45%'}>
          <SoupedUpSlider
            id="gamesAhead"
            type="range"
            min="-20"
            max="10"
            step="1"
            value={gamesAhead}
            onChange={onGamesAheadChange}
          />
          <Text size={12} style={{ marginTop: '1rem' }}>
            {Math.abs(gamesAhead)} Games {gamesAhead < 0 ? 'Behind' : 'Ahead'}
          </Text>
        </Flex>
        <Spacing margin="1rem" />

        <Flex direction="column" flexBasis={'45%'}>
          <SoupedUpSlider
            id="winLoss"
            type="range"
            min="0"
            max="1"
            step=".05"
            value={winLossRatio}
            onChange={onWinLossRatioChange}
          />
          <Text size={12} style={{ marginTop: '1rem' }}>
            {winLossRatio} Win Loss Ratio
          </Text>
        </Flex>
      </Flex>
    </FeatureGroupWrapper>
  );
}
