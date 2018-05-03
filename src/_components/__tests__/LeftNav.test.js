import React from 'react';
import { LeftNav } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<LeftNav />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
