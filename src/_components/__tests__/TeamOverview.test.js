import React from 'react';
import { TeamOverview } from '_components';
import renderer from 'react-test-renderer';

// this will evolve to test winLoss and gamesRemaining props, when component is fleshed out...

const stats = { wins: 10, losses: 1, gamesTotal: 1 };

it('renders correctly with props', () => {
  const tree = renderer.create(<TeamOverview stats={stats} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with toggledSidebar', () => {
  const tree = renderer
    .create(<TeamOverview onToggleSidebar="" stats={stats} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
