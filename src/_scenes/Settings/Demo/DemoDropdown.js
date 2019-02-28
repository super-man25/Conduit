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
      arrowColor={cssConstants.PRIMARY_LIGHT_BLUE}
      containerStyle={{
        border: `1px solid ${cssConstants.PRIMARY_DARKEST_GRAY}`,
        borderRadius: '4px',
        backgroundColor: cssConstants.PRIMARY_WHITE,
        padding: '3px 8px',
        color: cssConstants.PRIMARY_DARKEST_GRAY
      }}
    />
  );
};
