import React from 'react';
import { MainContent } from './';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<MainContent />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with sidebar prop', () => {
  const tree = renderer
    .create(<MainContent sidebar />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with leftNav prop', () => {
  const tree = renderer
    .create(<MainContent leftNav />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
