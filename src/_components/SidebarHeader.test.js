import React from 'react';
import { SidebarHeader } from './';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<SidebarHeader></SidebarHeader>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
