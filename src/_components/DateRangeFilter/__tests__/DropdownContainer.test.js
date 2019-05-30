import React from 'react';
import renderer from 'react-test-renderer';
import { DropdownContainer } from '../DropdownContainer';

it('renders correctly', () => {
  const mockClickawayFunction = jest.fn();
  const tree = renderer
    .create(<DropdownContainer onClickAway={mockClickawayFunction} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
