import React from 'react';
import { MainContent } from './';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<MainContent></MainContent>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with sidebar prop', () => {
  const tree = renderer
    .create(<MainContent sidebar></MainContent>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with leftNav prop', () => {
  const tree = renderer
    .create(<MainContent leftNav></MainContent>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});