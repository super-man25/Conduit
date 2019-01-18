// @flow

import {
  Breadcrumbs,
  Flex,
  H3,
  PageWrapper,
  PrimaryContent,
  S1,
  Spacing
} from '_components';
import { withRouter } from 'react-router-dom';
import React from 'react';
import TeamInfo from './components/TeamInfo';
import TeamIntegrationsContainer from './containers/TeamIntegrationsContainer';
import { connect } from 'react-redux';
import { actions as clientActions } from '_state/client';
import { bindActionCreators } from 'redux';
import type { EDClient } from '_models';

const TeamWrapper = Flex.extend`
  flex-direction: column;
  justify-content: left;
  min-width: 100%;
`;

type Props = {
  clientActions: {
    fetch: () => void,
    update: ({ pricingInterval?: number }) => void
  },
  clientState: EDClient
};

const teamCrumb = [
  {
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    title: 'Team Settings',
    path: '/settings'
  }
];

export class TeamSettings extends React.Component<Props> {
  componentDidMount() {
    this.props.clientActions.fetch();
  }

  render() {
    return (
      <PageWrapper>
        <PrimaryContent padding="2rem">
          <TeamWrapper>
            <Spacing margin="2rem 0">
              <Breadcrumbs crumbs={teamCrumb} />
            </Spacing>
            <H3 type="secondary">Team Settings</H3>
            <S1 weight="300">
              <i>Team Information and settings</i>
            </S1>
            <TeamInfo
              {...this.props.clientState}
              {...this.props.clientActions}
            />
            <TeamIntegrationsContainer />
          </TeamWrapper>
        </PrimaryContent>
      </PageWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    clientState: state.client
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    clientActions: bindActionCreators(clientActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchtoProps
  )(TeamSettings)
);
