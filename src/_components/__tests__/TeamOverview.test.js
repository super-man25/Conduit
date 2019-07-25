import React from 'react';
import { TeamOverviewPresenter as TeamOverview } from '_components';
import renderer from 'react-test-renderer';

const createProps = (update) => ({
  stats: { wins: 10, losses: 1, ties: 3, gamesTotal: 1 },
  onToggleSidebar: jest.fn(),
  seasons: [],
  selectedSeason: null,
  setActiveSeasonId: jest.fn(),
  eventList: [],
  client: {
    performanceType: 'MLB'
  },
  ...update
});

it('renders correctly with props', () => {
  const props = createProps();
  const tree = renderer.create(<TeamOverview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with NFL performance type', () => {
  const props = createProps({
    client: {
      performanceType: 'NFL'
    }
  });
  const tree = renderer.create(<TeamOverview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with toggledSidebar', () => {
  const props = createProps();
  const tree = renderer.create(<TeamOverview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
