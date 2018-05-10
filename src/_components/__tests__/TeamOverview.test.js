import React from 'react';
import { TeamOverview } from '_components';
import renderer from 'react-test-renderer';

// this will evolve to test winLoss and gamesRemaining props, when component is fleshed out...

it('renders correctly with props', () => {
  const stats = Object({ wins: 10, losses: 1, gamesRemsining: 1 });
  const tree = renderer.create(<TeamOverview onToggleSidebar="" stats={stats}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
