import React from 'react';
import { TeamOverviewPresenter as TeamOverview } from '_components';
import renderer from 'react-test-renderer';

const createProps = (update) => ({
  stats: { wins: 10, losses: 1, ties: 3, gamesTotal: 14 },
  onToggleSidebar: jest.fn(),
  seasons: [],
  selectedSeason: null,
  setActiveSeasonId: jest.fn(),
  eventList: [],
  client: {
    performanceType: 'MLB',
  },
  ...update,
});

it('renders correctly with MLB performance type', () => {
  const props = createProps();
  const tree = renderer.create(<TeamOverview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with NFL performance type', () => {
  const props = createProps({
    client: {
      performanceType: 'NFL',
    },
  });
  const tree = renderer.create(<TeamOverview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with MLS performance type', () => {
  const props = createProps({
    client: {
      performanceType: 'MLS',
    },
  });
  const tree = renderer.create(<TeamOverview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with NCAAF performance type', () => {
  const props = createProps({
    client: {
      performanceType: 'NCAAF',
    },
  });
  const tree = renderer.create(<TeamOverview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with NCAAB performance type', () => {
  const props = createProps({
    client: {
      performanceType: 'NCAAB',
    },
  });
  const tree = renderer.create(<TeamOverview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with toggledSidebar', () => {
  const props = createProps();
  const tree = renderer.create(<TeamOverview {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
