import React from 'react';
import { Breadcrumbs } from './';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Breadcrumbs>Dashboard / Settings</Breadcrumbs>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});