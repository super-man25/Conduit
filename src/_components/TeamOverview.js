// @flow

import * as React from 'react';
import styled from 'styled-components';
import { Flex, FlexItem, H4, Button, H3, P1 } from '_components';
import { cssConstants } from '_constants';
import { Dropdown } from './Dropdown';
import { connect } from 'react-redux';
import { selectors, actions } from '_state/season';
import { selectors as eventListSelectors } from '_state/eventList';
import { createStructuredSelector } from 'reselect';
import type { EDSeason, EDEvent } from '_models';

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
`;

const StatLabel = styled(H3)`
  margin: 0;
  padding: 0;
  color: ${cssConstants.PRIMARY_WHITE};
`;

type Stats = {
  wins: number,
  losses: number,
  gamesTotal: number
};

type Props = {
  onToggleSidebar: boolean,
  stats: Stats,
  seasons: EDSeason[],
  selectedSeason: EDSeason,
  setActiveSeasonId: (id: number) => void,
  eventList: EDEvent[]
};

export class TeamOverviewPresenter extends React.Component<Props> {
  calculateRecord = (wins: number, losses: number) => {
    const record = (wins / (wins + losses)).toFixed(3);
    if (isNaN(record)) {
      return '--';
    }
    return record;
  };

  showRecord = (stats: Stats) => {
    if (stats === null) {
      return '--';
    } else {
      return this.calculateRecord(stats.wins, stats.losses);
    }
  };

  showGamesRemaining = (eventList: EDEvent[]) => {
    if (eventList === null) {
      return '--';
    } else {
      const gamesRemaining = eventList.filter((event) => {
        return new Date(event.timestamp).getTime() >= Date.now();
      }).length;
      return gamesRemaining || '--';
    }
  };

  render() {
    const {
      onToggleSidebar,
      stats,
      seasons,
      selectedSeason,
      setActiveSeasonId,
      eventList
    } = this.props;

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
          <Button small collapse onClick={onToggleSidebar} />
        </Flex>

        <Flex direction="row" align="center" justify="space-between">
          <FlexItem flex={1}>
            <StatLabel>{this.showRecord(stats)}</StatLabel>
            <P1 color={cssConstants.PRIMARY_WHITE} weight="100">
              <i>Win / Loss</i>
            </P1>
          </FlexItem>
          <FlexItem flex={2}>
            <StatLabel>{this.showGamesRemaining(eventList)}</StatLabel>
            <P1 color={cssConstants.PRIMARY_WHITE} weight="100">
              <i>Home Games Remaining</i>
            </P1>
          </FlexItem>
        </Flex>
      </TeamOverviewContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  seasons: selectors.selectSeasons,
  selectedSeason: selectors.selectActiveSeason,
  eventList: eventListSelectors.selectEventList
});

const mapDispatchToProps = {
  setActiveSeasonId: actions.setActiveId
};

export const TeamOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamOverviewPresenter);
