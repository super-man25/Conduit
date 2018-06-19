import React from 'react';
import { HideMe } from '../components/HideMe';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<HideMe />).toJSON();

  expect(tree).toMatchSnapshot();
});
