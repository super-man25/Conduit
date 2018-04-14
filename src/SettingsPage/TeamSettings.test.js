import React from 'react';
import TeamSettings from './TeamSettings';
import renderer from 'react-test-renderer';

it('renders correctly with no props', () => {
  const tree = renderer
    .create(<TeamSettings></TeamSettings>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});