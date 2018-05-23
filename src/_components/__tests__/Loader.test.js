import React from 'react';
import renderer from 'react-test-renderer';


import { Loader } from '_components/Loader';

it('should render default', () => {
  const tree = renderer.create(<Loader />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should render with optional props', () => {
  const tree = renderer.create(<Loader small color="pink" />).toJSON();

  expect(tree).toMatchSnapshot();
});
