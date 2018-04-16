import React from 'react';
import styled from 'styled-components';
import { EventListItem } from './EventListItem';
import { cssConstants } from '../../_constants';

import {
  H4,
  Input,
  Loader,
  SortableLabel,
  Spacing
} from '../../_components';

const Heading = H4.extend`
  margin: 0;
  padding: 0;
`;

const HeaderContainer = styled.div`
  border-bottom: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
`;

const NoContentWrap = styled.div`
  padding: 10vh 0;
  text-align: center;
  color: ${cssConstants.PRIMARY_DARK_GRAY};
`;

export const EventList = (props) => {
  const {
    active,
    events,
    loading,
    onClick
  } = props;

  return (
    <div>
      <HeaderContainer>
        <Spacing padding="24px 40px">
          <Heading>All Events</Heading>
          <Input type="text" />
          <Spacing padding="6px 0 0">
            <SortableLabel>Upcoming</SortableLabel>
          </Spacing>
        </Spacing>
      </HeaderContainer>
      <div>
        {!!loading && <Spacing padding="10vh 0">
          <Loader />
        </Spacing>}

        {!loading && !events.length && <NoContentWrap>
          <Heading>No events matching query</Heading>
        </NoContentWrap>}

        {!loading && !!events.length && events.map((event, key) => (
          <EventListItem
            onClick={() => onClick(key, event)}
            active={key === active}
            key={key}
            event={event}
          />
        ))}
      </div>
    </div>
  );
};

EventList.defaultProps = {
  events: [],
  loading: false,
  onclick: () => {}
};

