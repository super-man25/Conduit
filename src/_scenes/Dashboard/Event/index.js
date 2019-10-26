// @flow
import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { CenteredLoader } from '_components';
import { connect } from 'react-redux';
import { actions } from '_state/event';
import type { State as EventState } from '_state/event';
import { replace } from 'connected-react-router';
import EventInventory from './routes/EventInventory';
import EventOverview from './routes/EventOverview';
import { SecuredRoute } from '_components';

import type { EDUser } from '_models/user';

type Props = {
  match: { params: { id: string } },
  replace: typeof replace,
  fetchEvent: typeof actions.fetchEvent,
  eventState: EventState,
  authState: {
    model: EDUser
  }
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
      eventState: { event, loading },
      authState
    } = this.props;

    const isAuthorized = !!authState.model;

    if (loading) {
      return (
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          <CenteredLoader />
        </div>
      );
    }

    if (!!event) {
      return (
        <Switch>
          <SecuredRoute
            path="/event/:id/inventory"
            authorized={isAuthorized}
            component={EventInventory}
          />
          <SecuredRoute
            path="/event/:id"
            authorized={isAuthorized}
            component={EventOverview}
          />
          <Redirect to="/season" />
        </Switch>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => ({
  eventState: state.event,
  authState: state.auth
});

const mapDispatchToProps = {
  fetchEvent: actions.fetchEvent,
  replace
};

export const Event = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventRoute);
