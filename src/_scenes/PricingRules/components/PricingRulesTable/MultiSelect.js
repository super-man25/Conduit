// @flow
import * as React from 'react';
import { Text, Flex, Box } from '_components';
import {
  MultiSelectList,
  MultiSelectListItem,
  Checkbox,
  MultiSelectContainer
} from './styled';

export type Option = {
  id: number
};

type Props = {
  items: any[],
  labelFn: (item: Option) => string,
  selectedItems: any[],
  onItemClicked: (item: Option) => void,
  label: string
};

export const MultiSelect = ({
  items,
  labelFn,
  selectedItems,
  onItemClicked,
  label
}: Props) => (
  <MultiSelectContainer>
    <Flex align="center" justify="space-between" padding="1rem">
      <Text size={13} weight={600}>
        {label}
      </Text>
    </Flex>
    <Box height="400px">
      <MultiSelectList>
        {items.map((item) => (
          <MultiSelectListItem key={item.id}>
            <Checkbox
              checked={selectedItems.includes(item.id)}
              onChange={() => onItemClicked(item)}
            />
            <Text size={13}>{labelFn(item)}</Text>
          </MultiSelectListItem>
        ))}
      </MultiSelectList>
    </Box>
  </MultiSelectContainer>
);
