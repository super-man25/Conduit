import React from 'react';
import { Input } from './';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<Input></Input>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with disabled prop', () => {
  const tree = renderer
    .create(<Input disabled></Input>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with valid prop', () => {
  const tree = renderer
    .create(<Input valid></Input>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with inValid prop', () => {
  const tree = renderer
    .create(<Input inValid></Input>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
