// @flow
import * as React from 'react';
import { Box, Flex, Text } from '_components';
import {
  Checkbox,
  FilterButton,
  FilterContainer,
  FilterList,
  FilterListItem,
} from './styled';
import type { EDInventorySectionFilter, EDVenuePriceScale } from '_models';
import { colors } from '_constants';

type Props = {
  disclaimer: string,
  filters: EDVenuePriceScale[] | EDInventorySectionFilter[],
  label: string,
  onItemClicked: (filter: EDVenuePriceScale | EDInventorySectionFilter) => void,
  onClearAllClicked: () => void,
  selectedFilters: EDVenuePriceScale[] | EDInventorySectionFilter[],
};

export const Filter = ({
  disclaimer,
  filters,
  label,
  onItemClicked,
  onClearAllClicked,
  selectedFilters,
}: Props) => (
  <FilterContainer>
    <Flex align="center" justify="space-between" padding="1rem">
      <Text weight={600}>
        {`Filter by ${label === 'Scale' ? 'Price Scale' : label}`}
      </Text>
      <FilterButton onClick={onClearAllClicked}>Clear</FilterButton>
    </Flex>
    <Box padding="0rem 1rem 1rem 1rem">
      <Text size={12} color={colors.lightGray} fontStyle="italic">
        {disclaimer}
      </Text>
    </Box>
    <Box height="270px">
      <FilterList>
        {filters.map((filter) => (
          <FilterListItem key={filter.id}>
            <Checkbox
              checked={selectedFilters.includes(filter)}
              onChange={() => onItemClicked(filter)}
            />
            <Text size={14}>{filter.name}</Text>
          </FilterListItem>
        ))}
      </FilterList>
    </Box>
  </FilterContainer>
);
