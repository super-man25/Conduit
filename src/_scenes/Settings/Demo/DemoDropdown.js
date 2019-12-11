import * as React from 'react';
import { Dropdown } from '_components';
import { cssConstants } from '_constants';

export const DemoDropdown = ({
  id,
  selected,
  onChange,
  options,
  parseOption
}) => {
  return (
    <Dropdown
      id={id}
      selected={selected}
      onChange={onChange}
      options={options}
      parseOption={parseOption}
      arrowColor={cssConstants.PRIMARY_BLUE}
    />
  );
};
