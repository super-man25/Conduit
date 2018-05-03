import React from 'react';
import { OuterWrapper } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<OuterWrapper />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
