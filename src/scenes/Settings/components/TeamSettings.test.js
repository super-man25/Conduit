import React from 'react';
import TeamSettings from './TeamSettings';
import renderer from 'react-test-renderer';

xit('renders correctly with no props', () => {
  const tree = renderer
    .create(<TeamSettings />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
