// @flow
import * as React from 'react';
import { MultiSelectOption, Checkbox } from './styled';
import { Flex } from '_components';

type Props = {
  options: any,
  selected: any[],
  onItemClicked: (option: any) => void,
  labelFn: (option: any, truncate: boolean) => string
};

export function MultiSelectView({
  options,
  selected,
  onItemClicked,
  labelFn
}: Props) {
  return options.map((option, idx) => (
    <MultiSelectOption
      isActive={selected.includes(option.id)}
      key={idx}
      onClick={() => onItemClicked(option)}
    >
      <Flex align="center">
        <Checkbox
          checked={selected.includes(option.id)}
          onChange={() => onItemClicked(option)}
        />
        {labelFn(option, false)}
      </Flex>
    </MultiSelectOption>
  ));
}
