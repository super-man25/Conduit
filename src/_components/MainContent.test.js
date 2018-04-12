import React from 'react';
import { MainContent } from './';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<MainContent></MainContent>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});