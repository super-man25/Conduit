// @flow
import * as React from 'react';
import { MultiSelectOption, Checkbox } from './styled';
import { Flex } from '_components';

type Props = {
  options: any,
  selected: any[],
  disabled: string[],
  onItemClicked: (option: any) => void,
  labelFn: (option: any, truncate: boolean) => string,
};

export function MultiSelectView({
  options,
  selected,
  disabled,
  onItemClicked,
  labelFn,
}: Props) {
  const isDisabled = (option) => {
    return !!disabled && disabled.includes(option.id);
  };

  return options.map((option, idx) => (
    <MultiSelectOption
      isActive={selected.includes(option.id)}
      key={idx}
      onClick={() => isDisabled(option) || onItemClicked(option)}
    >
      <Flex align="center">
        <Checkbox
          checked={selected.includes(option.id)}
          onChange={() => onItemClicked(option)}
          disabled={isDisabled(option)}
        />
        {labelFn(option, false)}
      </Flex>
    </MultiSelectOption>
  ));
}
