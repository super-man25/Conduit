import React from 'react';
import { Input } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<Input />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with disabled prop', () => {
  const tree = renderer
    .create(<Input disabled />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with valid prop', () => {
  const tree = renderer
    .create(<Input valid />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with inValid prop', () => {
  const tree = renderer
    .create(<Input inValid />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
