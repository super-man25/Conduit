import React from 'react';
import { StyledApiAlert } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer.create(<StyledApiAlert />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with show = true & no type prop', () => {
  const tree = renderer.create(<StyledApiAlert show="true" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with show = true & type = apiError', () => {
  const tree = renderer
    .create(<StyledApiAlert show="true" type="apiError" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with show = true & type = apiSuccess', () => {
  const tree = renderer
    .create(<StyledApiAlert show="true" type="apiSuccess" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
