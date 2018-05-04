import React from 'react';
import { SidebarHeader } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<SidebarHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
