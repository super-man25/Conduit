import React from 'react';
import { Button } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with hidden prop', () => {
  const tree = renderer.create(<Button hidden />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with disabled prop', () => {
  const tree = renderer.create(<Button disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with secondary prop', () => {
  const tree = renderer.create(<Button secondary />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with small prop', () => {
  const tree = renderer.create(<Button small />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with collapse prop', () => {
  const tree = renderer.create(<Button collapse />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with expand prop', () => {
  const tree = renderer.create(<Button expand />).toJSON();
  expect(tree).toMatchSnapshot();
});
