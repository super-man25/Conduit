import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  readableDate
} from '../../../../_helpers/string-utils';

import {
  H1,
  P1,
  Loader
} from '../../../../_components';

const CenteredContainer = styled.div`
  max-width: 1440px;
  margin: auto;
`;

function getEventIdFromPath(path) {
  const parts = path.split('/');
  if (parts[1] !== 'event') {
    return null;
  }
  const parsed = parseInt(parts[2]);
  return isNaN(parsed) ? null : parsed;
}

const Event = (props) => {
  const { eventState, location } = props;

  const activeId = getEventIdFromPath(location.pathname);
  const event = eventState.model && eventState.model.length ? eventState.model.find((e) => e.id === activeId) : null;

  return (
    <CenteredContainer>
      <H1>Event</H1>
      {!event && (
        <Loader />
      )}

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
    eventState: state.events
  };
}

export default withRouter(connect(mapStateToProps)(Event));
