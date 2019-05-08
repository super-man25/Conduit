import React from 'react';
import { Button } from '_components/';
import renderer from 'react-test-renderer';
import { PrimaryButton, SecondaryButton, GrayButton } from '../Button';

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

it('<PrimaryButton /> renders correctly', () => {
  const tree = renderer.create(<PrimaryButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('<PrimaryButton /> renders when disabled', () => {
  const tree = renderer.create(<PrimaryButton disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('<PrimaryButton /> renders with a small prop', () => {
  const tree = renderer.create(<PrimaryButton disabled small />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('<SecondaryButton /> renders correctly', () => {
  const tree = renderer.create(<SecondaryButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('<GrayButton /> renders correctly', () => {
  const tree = renderer.create(<GrayButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

// These are excluded due to a parsing issue with jest-styled-component and
// dynamic before content
xit('renders correctly with collapse prop', () => {
  const tree = renderer.create(<Button collapse />).toJSON();
  expect(tree).toMatchSnapshot();
});

xit('renders correctly with expand prop', () => {
  const tree = renderer.create(<Button expand />).toJSON();
  expect(tree).toMatchSnapshot();
});
