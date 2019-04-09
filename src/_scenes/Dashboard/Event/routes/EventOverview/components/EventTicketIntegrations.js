// @flow
import React, { Component } from 'react';
import { TicketIntegrations } from '_scenes/Dashboard/components/TicketIntegrations';
import type { EDIntegrationStat } from '_models';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors, actions } from '_state/ticketIntegrations';

type Props = {
  ticketIntegrations: EDIntegrationStat[],
  loading: boolean,
  error: ?Error,
  id: number,
  fetchTicketIntegrations: ({ eventId: number }) => void
};

export class EventTicketIntegrationsPresenter extends Component<Props> {
  componentDidMount() {
    const { id } = this.props;
    this.props.fetchTicketIntegrations({ eventId: id });
  }

  componentDidUpdate(prevProps: Props) {
    const { id } = this.props;

    if (id !== prevProps.id) {
      this.props.fetchTicketIntegrations({ eventId: id });
    }
  }
  render() {
    const { id, ticketIntegrations, loading, error } = this.props;
    return (
      <TicketIntegrations
        id={id}
        ticketIntegrations={ticketIntegrations}
        loading={loading}
        error={error}
        showSettings
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  ticketIntegrations: selectors.selectTicketIntegrations,
  loading: selectors.selectTicketIntegrationsLoading,
  error: selectors.selectTicketIntegrationsError
});

const mapDispatchToProps = {
  fetchTicketIntegrations: actions.fetchTicketIntegrations
};

export const EventTicketIntegrations = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventTicketIntegrationsPresenter);
