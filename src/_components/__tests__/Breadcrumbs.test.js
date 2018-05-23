import React from 'react';
import { Breadcrumbs } from '_components/Breadcrumbs';
import renderer from 'react-test-renderer';


it('renders correctly', () => {
  const tree = renderer.create(<Breadcrumbs />).toJSON();

  expect(tree).toMatchSnapshot();
});
