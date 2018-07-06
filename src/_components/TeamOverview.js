// @flow

import * as React from 'react';
import styled from 'styled-components';
import { Flex, FlexItem, H4, Button, H3, P1 } from '_components';
import { cssConstants } from '_constants';
import { Dropdown } from './Dropdown';
import { connect } from 'react-redux';
import { selectors, actions } from '_state/season';
import { createStructuredSelector } from 'reselect';
import type { EDSeason } from '_models';

const TeamOverviewContainer = styled.div`
  height: 100%;
  width: auto;
  margin: 0;
  padding-left: 20px;
  color: ${cssConstants.PRIMARY_WHITE};
  background: 'none';
`;

const Heading = H4.extend`
  margin: 0;
  padding: 0;
  vertical-align: top;
  color: ${cssConstants.PRIMARY_WHITE};
`;

const StatLabel = H3.extend`
  margin: 0;
  padding: 0;
  color: ${cssConstants.PRIMARY_WHITE};
  weight: 300;
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
  setActiveSeasonId: (id: number) => void
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

  showGamesRemaining = (stats: Stats) => {
    if (stats === null) {
      return '--';
    } else {
      const total = stats.gamesTotal - stats.wins - stats.losses;
      return total || '--';
    }
  };

  render() {
    const {
      onToggleSidebar,
      stats,
      seasons,
      selectedSeason,
      setActiveSeasonId
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
            <StatLabel>{this.showGamesRemaining(stats)}</StatLabel>
            <P1 color={cssConstants.PRIMARY_WHITE} weight="100">
              <i>Games Remaining</i>
            </P1>
          </FlexItem>
        </Flex>
      </TeamOverviewContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  seasons: selectors.selectSeasons,
  selectedSeason: selectors.selectActiveSeason
});

const mapDispatchToProps = {
  setActiveSeasonId: actions.setActiveId
};

export const TeamOverview = connect(mapStateToProps, mapDispatchToProps)(
  TeamOverviewPresenter
);
