import React from 'react';
import renderer from 'react-test-renderer';
import { Dropdown } from '../Dropdown';

it('renders correctly when closed', () => {
  const tree = renderer.create(<Dropdown />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly when open', () => {
  const tree = renderer.create(<Dropdown isOpen />).toJSON();
  expect(tree).toMatchSnapshot();
});
