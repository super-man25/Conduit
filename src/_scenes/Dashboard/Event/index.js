// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CenteredLoader } from '_components';
import { connect } from 'react-redux';
import { actions } from '_state/event';
import type { State as EventState } from '_state/event';
import { replace } from 'connected-react-router';
import EventInventory from './routes/EventInventory';
import EventOverview from './routes/EventOverview';

type Props = {
  match: { params: { id: string } },
  replace: typeof replace,
  fetchEvent: typeof actions.fetchEvent,
  eventState: EventState
};

export class EventRoute extends React.Component<Props> {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchEvent(+id);
  }

  componentDidUpdate(prevProps: Props) {
    const { id } = this.props.match.params;

    if (id !== prevProps.match.params.id) {
      this.props.fetchEvent(+id);
    }
  }

  render() {
    const {
      eventState: { event, error, loading }
    } = this.props;

    if (loading) {
      return (
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          <CenteredLoader />
        </div>
      );
    }

    if (error) {
      this.props.replace('/season');
    }

    return (
      event && (
        <Switch>
          <Route path="/event/:id/inventory" component={EventInventory} />
          <Route path="/event/:id" component={EventOverview} />
          <Redirect to="/season" />
        </Switch>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  eventState: state.event
});

const mapDispatchToProps = {
  fetchEvent: actions.fetchEvent,
  replace
};

export const Event = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventRoute);
