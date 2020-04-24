// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as clientActions } from '_state/client';
import { TeamIntegrations } from '../components/TeamIntegrations';

type Props = {
  clientActions: {
    fetchIntegrations: () => void,
  },
  clientState: {
    integrations: Array<any>,
  },
};

export class TeamIntegrationsContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.clientActions.fetchIntegrations();
  }

  render() {
    const { integrations } = this.props.clientState;
    const primaryIntegrations = integrations.filter((i) => i.isPrimary);
    const secondaryIntegrations = integrations.filter((i) => !i.isPrimary);

    return (
      <TeamIntegrations
        primaryIntegrations={primaryIntegrations}
        secondaryIntegrations={secondaryIntegrations}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    clientState: state.client,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clientActions: bindActionCreators(clientActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamIntegrationsContainer);
