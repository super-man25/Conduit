import React from 'react';
import { TeamOverviewPresenter as TeamOverview } from '_components';
import renderer from 'react-test-renderer';

const createProps = () => ({
  stats: { wins: 10, losses: 1, gamesTotal: 1 },
  onToggleSidebar: jest.fn(),
  seasons: [],
  selectedSeason: null,
  setActiveSeasonId: jest.fn(),
  eventList: []
});

it('renders correctly with props', () => {
  const props = createProps();
  const tree = renderer.create(<TeamOverview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with toggledSidebar', () => {
  const props = createProps();
  const tree = renderer.create(<TeamOverview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
