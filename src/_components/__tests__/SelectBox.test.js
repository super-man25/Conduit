import React from 'react';
import { SelectBox } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer.create(<SelectBox />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with noBg prop', () => {
  const tree = renderer.create(<SelectBox noBg />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with valid prop', () => {
  const tree = renderer.create(<SelectBox valid />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with invalid prop', () => {
  const tree = renderer.create(<SelectBox invalid />).toJSON();
  expect(tree).toMatchSnapshot();
});
