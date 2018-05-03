import React from 'react';
import { SettingEditButton } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer.create(<SettingEditButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with noEdit prop', () => {
  const tree = renderer.create(<SettingEditButton noEdit />).toJSON();
  expect(tree).toMatchSnapshot();
});
