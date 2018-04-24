import React from 'react';
import renderer from 'react-test-renderer';
import { Breadcrumbs } from './';
import 'jest-styled-components';

it('renders correctly', () => {
  const tree = renderer
    .create(<Breadcrumbs>Dashboard / Settings</Breadcrumbs>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
