import React from 'react';
import renderer from 'react-test-renderer';
import { Breadcrumbs } from './';

it('renders correctly', () => {
  const tree = renderer
    .create(<Breadcrumbs>Dashboard / Settings</Breadcrumbs>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
