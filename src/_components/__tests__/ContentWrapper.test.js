import React from 'react';
import { ContentWrapper } from '_components/';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<ContentWrapper />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with login prop', () => {
  const tree = renderer
    .create(<ContentWrapper login />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
