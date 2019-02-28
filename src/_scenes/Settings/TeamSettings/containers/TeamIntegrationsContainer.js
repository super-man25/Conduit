// @flow

import React from 'react';
import { TeamIntegrations } from '../components/TeamIntegrations';
import { bindActionCreators } from 'redux';
import { actions as clientActions } from '_state/client';
import { connect } from 'react-redux';

type Props = {
  clientActions: {
    fetchIntegrations: () => void,
    toggleIntegration: ({ id: number, isActive: boolean }) => void,
    updateSecondaryPricingRule: ({
      id: number,
      percent: number,
      constant: number
    }) => void
  },
  clientState: {
    integrations: Array<any>
  }
};

export class TeamIntegrationsContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.clientActions.fetchIntegrations();
  }

  handleIntegrationToggle = ({ id }: { id: number }, isActive: boolean) => {
    this.props.clientActions.toggleIntegration({ id, isActive });
  };

  handleSecondaryPriceRuleUpdate = (payload: {
    id: number,
    percent: number,
    constant: number
  }) => {
    this.props.clientActions.updateSecondaryPricingRule(payload);
  };

  render() {
    const { integrations } = this.props.clientState;
    const primary = integrations.filter((i) => i.isPrimary);
    const secondary = integrations.filter((i) => !i.isPrimary);

    return (
      <TeamIntegrations
        primary={primary}
        secondary={secondary}
        handleIntegrationToggle={this.handleIntegrationToggle}
        handleSecondaryPriceRuleUpdate={this.handleSecondaryPriceRuleUpdate}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    clientState: state.client
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clientActions: bindActionCreators(clientActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamIntegrationsContainer);
