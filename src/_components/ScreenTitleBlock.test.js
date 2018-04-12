import React from 'react';
import { ScreenTitleBlock } from './';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<ScreenTitleBlock></ScreenTitleBlock>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
