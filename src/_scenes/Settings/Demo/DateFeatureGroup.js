import * as React from 'react';
import { distanceInWordsToNow, subMinutes } from 'date-fns';

import { Flex, Toggle, Spacing, Text } from '_components';
import {
  FeatureGroupWrapper,
  SoupedUpSlider,
  FeatureGroupTitle,
  FeatureInputLabel
} from './styled';
import { DemoDropdown } from './DemoDropdown';

export function DateFeatureGroup({
  minutesBefore,
  selectedMonth,
  selectedDay,
  optionsMonth,
  optionsDay,
  onMonthDropdownChange,
  onDayDropdownChange,
  parseOption,
  homeOpenerIsChecked,
  onHomeOpenerChanged,
  minutesBeforeValue,
  onMinutesBeforeChange
}) {
  return (
    <FeatureGroupWrapper>
      <FeatureGroupTitle>Date</FeatureGroupTitle>

      <Flex justify="space-between">
        <Flex
          direction="column"
          flexBasis={'30%'}
          style={{ paddingRight: '0 10px' }}
          justify="space-between"
        >
          <FeatureInputLabel>Month</FeatureInputLabel>
          <DemoDropdown
            id="monthDrop"
            selected={selectedMonth}
            onChange={onMonthDropdownChange}
            options={optionsMonth}
            parseOption={parseOption}
          />
        </Flex>

        <Flex
          direction="column"
          flexBasis={'30%'}
          style={{ padding: '0 10px' }}
          justify="space-between"
        >
          <FeatureInputLabel>Day of Week</FeatureInputLabel>
          <DemoDropdown
            id="dayDrop"
            selected={selectedDay}
            onChange={onDayDropdownChange}
            options={optionsDay}
            parseOption={parseOption}
          />
        </Flex>

        <Flex
          direction="column"
          flexBasis={'30%'}
          justify="space-between"
          alignSelf="flex-start"
        >
          <FeatureInputLabel
            style={{ marginBottom: '20px', alignSelf: 'center' }}
          >
            Home Opener
          </FeatureInputLabel>
          <Toggle
            isChecked={homeOpenerIsChecked}
            onChange={onHomeOpenerChanged}
            size="small"
          />
        </Flex>
      </Flex>

      <Spacing margin={'3rem'} />

      <Flex>
        <Flex flexBasis={'90%'} direction="column">
          <SoupedUpSlider
            id="minBefore"
            type="range"
            min="0"
            max="20160"
            step="60"
            value={minutesBeforeValue}
            onChange={onMinutesBeforeChange}
          />
          <Text size={12} style={{ marginTop: '1rem' }}>
            {distanceInWordsToNow(subMinutes(new Date(), minutesBeforeValue))}{' '}
            before game
          </Text>
        </Flex>
      </Flex>
    </FeatureGroupWrapper>
  );
}
