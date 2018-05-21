import { H1, Loader, P1, CenteredContainer } from '_components';
import { readableDate } from '_helpers/string-utils';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Event = (props) => {
  const { eventState } = props;
  const { events, activeId } = eventState;

  const event = events.find((e) => e.id === activeId);

  return (
    <CenteredContainer>
      <H1>Event</H1>
      {!event && <Loader />}

      {!!event && (
        <div>
          <P1>ID: {event.id}</P1>
          <P1>Name: {event.name}</P1>
          <P1>Timestamp: {readableDate(event.timestamp)}</P1>
        </div>
      )}
    </CenteredContainer>
  );
};

function mapStateToProps(state) {
  return {
    eventState: state.event
  };
}

export default withRouter(connect(mapStateToProps)(Event));
