// @flow

import * as React from 'react';
import styled from 'styled-components';
import { Icon, Flex, FlexItem, H4, TextButton, H3, P1 } from '_components';
import { cssConstants } from '_constants';
import { Dropdown } from './Dropdown';
import { connect } from 'react-redux';
import { selectors, actions } from '_state/season';
import { selectors as eventListSelectors } from '_state/eventList';
import { selectors as clientSelectors } from '_state/client';
import { createStructuredSelector } from 'reselect';
import type { PerformanceType, EDClient, EDSeason, EDEvent } from '_models';
import { pluralize } from '_helpers/string-utils';
import { isAfter } from 'date-fns';
import { fonts } from '_constants';

const TeamOverviewContainer = styled.div`
  height: 100%;
  width: auto;
  margin: 0;
  padding-left: 20px;
  color: ${cssConstants.PRIMARY_WHITE};
  background: 'none';
`;

const Heading = styled(H4)`
  margin: 0;
  padding: 0;
  vertical-align: top;
  color: ${cssConstants.PRIMARY_WHITE};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: bold;
`;

const StatLabel = styled(H3)`
  margin: 0;
  padding: 0;
  color: ${cssConstants.PRIMARY_WHITE};
  font-weight: bold;
`;

type Stats = {
  wins: number,
  losses: number,
  ties?: number,
  gamesTotal: number
};

type Props = {
  client: EDClient,
  onToggleSidebar: boolean,
  stats: Stats,
  seasons: EDSeason[],
  selectedSeason: EDSeason,
  setActiveSeasonId: (id: number) => void,
  eventList: EDEvent[]
};

export const TeamOverviewPresenter = (props: Props) => {
  const {
    client: { performanceType },
    eventList,
    onToggleSidebar,
    seasons,
    selectedSeason,
    setActiveSeasonId,
    stats
  } = props;

  const calculateRecordWithTie = (
    wins: ?number,
    losses: ?number,
    ties: ?number
  ) => {
    return `${stats.wins || '0'} - ${stats.losses || '0'} - ${stats.ties ||
      '0'}`;
  };

  const calculateRecord = (wins: ?number, losses: ?number) => {
    return `${stats.wins || '0'} - ${stats.losses || '0'}`;
  };

  const showRecord = (stats: Stats, performanceType: PerformanceType) => {
    if (stats === null) {
      return '--';
    }
    if (performanceType === 'NFL' || performanceType === 'MLS') {
      return calculateRecordWithTie(stats.wins, stats.losses, stats.ties);
    } else {
      return calculateRecord(stats.wins, stats.losses);
    }
  };

  const calculateGamesRemaining = (eventList: EDEvent[]) => {
    return eventList.filter((event) => {
      return isAfter(new Date(event.timestamp).getTime(), Date.now());
    }).length;
  };

  const showGamesRemaining = (eventList: EDEvent[]) => {
    if (eventList === null) {
      return '--';
    } else {
      const gamesRemaining = calculateGamesRemaining(eventList);
      return gamesRemaining || '--';
    }
  };

  const showRecordLabel = (performanceType: PerformanceType) => {
    if (performanceType === 'NFL' || performanceType === 'MLS') {
      return 'Win - Loss - Tie';
    } else {
      return 'Win - Loss';
    }
  };

  return (
    <TeamOverviewContainer>
      <Flex direction="row" align="center" justify="space-between">
        <Dropdown
          options={seasons}
          selected={selectedSeason}
          noneSelected={<Heading>Select a Season</Heading>}
          parseOption={(option) => option.name}
          onChange={(option) => setActiveSeasonId(option.id)}
          renderSelected={(option) => <Heading>{option.name}</Heading>}
        />
        <TextButton small collapse onClick={onToggleSidebar}>
          <Icon name="arrow-left" size={48} color="white" />
        </TextButton>
      </Flex>

      {stats && (
        <Flex direction="row" align="center" justify="space-between">
          <FlexItem flex={1}>
            <StatLabel>{showRecord(stats, performanceType)}</StatLabel>
            <P1
              color={cssConstants.PRIMARY_WHITE}
              weight="100"
              size="14px"
              font={fonts.FUTURA}
              letterSpacing="1px"
            >
              <i>{showRecordLabel(performanceType)}</i>
            </P1>
          </FlexItem>
          <FlexItem flex={2}>
            <StatLabel>{showGamesRemaining(eventList)}</StatLabel>
            <P1
              color={cssConstants.PRIMARY_WHITE}
              weight="100"
              size="14px"
              font={fonts.FUTURA}
              letterSpacing="1px"
            >
              <i>
                {`Home ${pluralize(
                  calculateGamesRemaining(eventList),
                  'Game',
                  'Games'
                )} Remaining`}
              </i>
            </P1>
          </FlexItem>
        </Flex>
      )}
    </TeamOverviewContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  seasons: selectors.selectSeasons,
  selectedSeason: selectors.selectActiveSeason,
  eventList: eventListSelectors.selectEventList,
  client: clientSelectors.getClient
});

const mapDispatchToProps = {
  setActiveSeasonId: actions.setActiveId
};

export const TeamOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamOverviewPresenter);
