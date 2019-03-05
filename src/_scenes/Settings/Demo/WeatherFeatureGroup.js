import * as React from 'react';

import { Flex, Spacing } from '_components';
import { cssConstants } from '_constants';
import {
  FeatureGroupWrapper,
  SoupedUpSlider,
  FeatureGroupTitle,
  FeatureInputLabel
} from './styled';
import { DemoDropdown } from './DemoDropdown';

export function WeatherFeatureGroup({
  selectedWeatherCondition,
  onWeatherConditionChange,
  optionsWeatherCondition,
  parseOption,
  temp,
  onTempChange
}) {
  return (
    <FeatureGroupWrapper>
      <FeatureGroupTitle>Weather</FeatureGroupTitle>

      <Flex justify="space-between">
        <Flex direction="column" flexBasis={'35%'}>
          <FeatureInputLabel>Weather Condition</FeatureInputLabel>
          <DemoDropdown
            id="condDrop"
            selected={selectedWeatherCondition}
            onChange={onWeatherConditionChange}
            options={optionsWeatherCondition}
            parseOption={parseOption}
          />
        </Flex>

        <Spacing margin="1rem" />

        <Flex direction="column" flexBasis={'50%'} style={{ display: 'none' }}>
          <FeatureInputLabel style={{ marginBottom: '23px' }}>
            Temperature
            <span
              style={{
                color: cssConstants.PRIMARY_DARKEST_GRAY,
                marginLeft: '5px'
              }}
            >
              {temp}&deg;F
            </span>
          </FeatureInputLabel>
          <SoupedUpSlider
            id="temp"
            type="range"
            min="50"
            max="100"
            step="5"
            value={temp}
            onChange={onTempChange}
          />
        </Flex>
      </Flex>
    </FeatureGroupWrapper>
  );
}
