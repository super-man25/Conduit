import React from 'react';
import TeamSettings from './';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<TeamSettings></TeamSettings>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});