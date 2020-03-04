// @flow
import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { isAfter } from 'date-fns';

import { pluralize } from '_helpers/string-utils';
import { containerPadding, colors } from '_constants';
import type { PerformanceType, EDEvent } from '_models';
import { selectors, actions as seasonActions } from '_state/season';
import { actions as uiActions } from '_state/ui';
import { selectors as clientSelectors } from '_state/client';
import { selectors as eventListSelectors } from '_state/eventList';
import { Icon, Flex, FlexItem, H4, H3, P1 } from '_components';
import { isMobileDevice } from '_helpers';
import { Dropdown } from '_components/Dropdown';

const StyledTeamOverview = styled.div`
  padding: ${containerPadding}px;
  color: ${colors.white};
`;

const Heading = styled(H4)`
  margin: 0;
  padding: 0;
  vertical-align: top;
  color: ${colors.white};
  letter-spacing: 0.5px;
  font-weight: bold;
`;

const StatLabel = styled(H3)`
  margin: 0;
  padding: 0;
  color: ${colors.white};
  font-weight: bold;
`;

const SidebarControl = styled(Icon)``;

const SeasonDropdown = styled(Dropdown)`
  border: none;
  padding: 0;
  background: none;
`;

type Stats = {
  wins: number,
  losses: number,
  ties?: number,
  overtimeLosses?: number,
  gamesTotal: number,
};

export const TeamOverview = () => {
  const dispatch = useDispatch();
  const setActiveSeasonId = (id) => dispatch(seasonActions.setActiveId(id));
  const toggleSidebar = () => dispatch(uiActions.toggleSidebar());
  const seasons = useSelector(selectors.selectSeasons);
  const selectedSeason = useSelector(selectors.selectActiveSeason);
  const eventList = useSelector(eventListSelectors.selectEventList);
  const { performanceType } = useSelector(clientSelectors.getClient);
  const teamStatState = useSelector(({ teamStat }) => teamStat);
  const activeSeasonId = useSelector(({ season }) => season.activeId);

  const stats: Stats = teamStatState.allSeasons.find(
    (season) => season.seasonId === activeSeasonId
  );

  const calculateRecordWithOvertimeLosses = (
    wins: ?number,
    losses: ?number,
    overtimeLosses: ?number
  ) => {
    return `${stats.wins || '0'} - ${stats.losses ||
      '0'} - ${stats.overtimeLosses || '0'}`;
  };

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
    } else if (performanceType === 'NHL') {
      return calculateRecordWithOvertimeLosses(
        stats.wins,
        stats.losses,
        stats.overtimeLosses
      );
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
    } else if (performanceType === 'NHL') {
      return 'Win - Loss - OT Loss';
    } else {
      return 'Win - Loss';
    }
  };

  return (
    <StyledTeamOverview>
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        marginBottom="15px"
      >
        <SeasonDropdown
          options={seasons}
          selected={selectedSeason}
          noneSelected={<Heading>Select a Season</Heading>}
          parseOption={(option) => option.name}
          onChange={(option) => setActiveSeasonId(option.id)}
          renderSelected={(option) => <Heading>{option.name}</Heading>}
        />
        {!isMobileDevice && (
          <SidebarControl
            name="arrowLeft"
            size={24}
            color="white"
            onClick={toggleSidebar}
          />
        )}
      </Flex>

      {stats && (
        <Flex direction="row" align="center" justify="space-between">
          <FlexItem flex={1}>
            <StatLabel>{showRecord(stats, performanceType)}</StatLabel>
            <P1 color={colors.white} size="14px" letterSpacing="1px">
              {showRecordLabel(performanceType)}
            </P1>
          </FlexItem>
          <FlexItem flex={1}>
            <StatLabel>{showGamesRemaining(eventList)}</StatLabel>
            <P1
              color={colors.white}
              size="14px"
              letterSpacing="1px"
            >{`${pluralize(
              calculateGamesRemaining(eventList),
              'Event',
              'Events'
            )} Remaining`}</P1>
          </FlexItem>
        </Flex>
      )}
    </StyledTeamOverview>
  );
};
