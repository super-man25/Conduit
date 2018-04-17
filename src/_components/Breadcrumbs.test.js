import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Breadcrumbs />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
