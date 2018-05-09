import React from 'react';
import { SelectDropdown } from '_components';
import renderer from 'react-test-renderer';

const selectOptions = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 }
];

describe('SelectDropdown', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SelectDropdown selected={selectOptions[0]} options={selectOptions} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
