import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { DropdownButton } from './DropdownButton';

const requiredProps = {
  options: ['dog', 'cat'],
  selected: 0
};

it('renders correctly', () => {
  const tree = renderer.create(<DropdownButton {...requiredProps} />).toJSON();

  expect(tree).toMatchSnapshot();
});
