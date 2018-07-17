// @flow
import * as React from 'react';
import { Flex, Text, Box } from '_components';
import {
  ScaleFilterContainer,
  ScaleFilterList,
  ScaleFilterListItem,
  ScaleFilterButton,
  Checkbox
} from './styled';

type Props = {
  scales: any[],
  selectedScales: any[],
  onItemClicked: (scale: any) => void,
  onSelectAllClicked: () => void
};

export const ScaleFilter = ({
  scales,
  selectedScales,
  onItemClicked,
  onSelectAllClicked
}: Props) => (
  <ScaleFilterContainer>
    <Flex align="center" justify="space-between" padding="1rem">
      <Text size={13} weight={600}>
        Filter by Price Scale
      </Text>
      <ScaleFilterButton onClick={onSelectAllClicked}>Clear</ScaleFilterButton>
    </Flex>
    <Box height="270px">
      <ScaleFilterList>
        {scales.map((scale) => (
          <ScaleFilterListItem key={scale}>
            <Checkbox
              checked={selectedScales.includes(scale)}
              onChange={() => onItemClicked(scale)}
            />
            <Text size={13}>{scale}</Text>
          </ScaleFilterListItem>
        ))}
      </ScaleFilterList>
    </Box>
  </ScaleFilterContainer>
);
