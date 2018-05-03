import React from 'react';
import { SettingCancelButton } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer.create(<SettingCancelButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with disabled prop', () => {
  const tree = renderer.create(<SettingCancelButton disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});
