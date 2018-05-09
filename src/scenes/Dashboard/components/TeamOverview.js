import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { P1, H4, Button } from '_components';
import { cssConstants } from '_constants';
import { Spacing } from '../../../_components';

const TeamOverviewContainer = styled.div`
  height: 100%;
  width: auto;
  margin: 0;
  padding-left: 20px;
  color: ${cssConstants.PRIMARY_WHITE};
  background: 'none';
`;

class TeamOverview extends React.Component {
  render() {
    const { onToggleSidebar } = this.props;
    return (
      <TeamOverviewContainer>
        <Spacing margin="0 80px 0 0" display="inline-block">
          <H4 floatLeft> Team Overview </H4>
        </Spacing>
        <Button small collapse onClick={onToggleSidebar} />
      </TeamOverviewContainer>
    );
  }
}

export default TeamOverview;
