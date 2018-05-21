import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex, FlexItem, H4, Button, H3, P2 } from '_components';
import { cssConstants } from '_constants';

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
`;

const StatLabel = H3.extend`
  margin: 0;
  padding: 0;
  color: ${cssConstants.PRIMARY_WHITE};
  weight: 300;
`;

export class TeamOverview extends React.Component {
  calculateRecord = (wins, losses) => {
    const record = (wins / (wins + losses)).toFixed(3);
    if (isNaN(record)) {
      return '--';
    }
    return record;
  };

  showRecord = (stats) => {
    if (stats === null) {
      return '--';
    } else {
      return this.calculateRecord(stats.wins, stats.losses);
    }
  };

  showGamesRemaining = (stats) => {
    if (stats === null) {
      return '--';
    } else {
      const total = stats.gamesTotal - stats.wins - stats.losses;
      return total || '--';
    }
  };

  render() {
    const { onToggleSidebar, stats } = this.props;

    return (
      <TeamOverviewContainer>
        <Flex direction="row" align="center" justify="space-between">
          <FlexItem flex={1}>
            <Heading> Team Overview </Heading>
          </FlexItem>
          <FlexItem flex={2}>
            <Button small collapse onClick={onToggleSidebar} />
          </FlexItem>
        </Flex>

        <Flex direction="row" align="center" justify="space-between">
          <FlexItem flex={1}>
            <StatLabel>{this.showRecord(stats)}</StatLabel>
            <P2 weight="100">
              <i>Win / Loss</i>
            </P2>
          </FlexItem>
          <FlexItem flex={2}>
            <StatLabel>{this.showGamesRemaining(stats)}</StatLabel>
            <P2 weight="100">
              <i>Games Remaining</i>
            </P2>
          </FlexItem>
        </Flex>
      </TeamOverviewContainer>
    );
  }
}

TeamOverview.propTypes = {
  stats: PropTypes.shape()
};
