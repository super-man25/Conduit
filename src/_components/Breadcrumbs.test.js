import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

it('renders correctly', () => {
  const tree = renderer.create(<Breadcrumbs />).toJSON();

  expect(tree).toMatchSnapshot();
});
