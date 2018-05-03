import React from 'react';
import { ScreenTitleBlock } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<ScreenTitleBlock />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
