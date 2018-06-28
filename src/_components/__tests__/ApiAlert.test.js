import React from 'react';
import { ApiAlertDiv } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer.create(<ApiAlertDiv />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with show = true & no type prop', () => {
  const tree = renderer.create(<ApiAlertDiv show="true" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with show = true & type = api-error', () => {
  const tree = renderer
    .create(<ApiAlertDiv show="true" type="api-error" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with show = true & type = api-success', () => {
  const tree = renderer
    .create(<ApiAlertDiv show="true" type="api-success" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
