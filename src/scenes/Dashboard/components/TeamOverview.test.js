import React from 'react';
import TeamOverview from './TeamOverview';
import renderer from 'react-test-renderer';

// this will evolve to test winLoss and gamesRemaining props, when component is fleshed out...

it('renders correctly with no props', () => {
  const tree = renderer.create(<TeamOverview />).toJSON();
  expect(tree).toMatchSnapshot();
});
