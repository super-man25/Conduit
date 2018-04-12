import React from 'react';
import { Sidebar } from './';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Sidebar></Sidebar>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
