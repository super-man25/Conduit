import React from 'react';
import { ContentWrapper } from './';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<ContentWrapper></ContentWrapper>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with login prop', () => {
  const tree = renderer
    .create(<ContentWrapper login></ContentWrapper>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
