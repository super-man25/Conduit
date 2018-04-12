import React from 'react';
import { Sidebar } from './';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<Sidebar></Sidebar>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with collapsed prop', () => {
  const tree = renderer
    .create(<Sidebar collapsed></Sidebar>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
