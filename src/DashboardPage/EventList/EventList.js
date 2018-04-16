import React from 'react';
import styled from 'styled-components';
import { EventListItem } from './EventListItem';
import { cssConstants } from '../../_constants';

import {
  H4,
  Input,
  Loader,
  Spacing
} from '../../_components';

const Heading = H4.extend`
  margin: 0;
  padding: 0;
`;

const HeaderContainer = styled.div`
  border-bottom: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
`;

export class EventList extends React.Component {
  state = { active: -1 };

  render() {
    const { loading, events } = this.props;
    const { active } = this.state;

    return (
      <div>
        <HeaderContainer>
          <Spacing padding="24px 40px">
            <Heading>All Events</Heading>
            <Input type="text" />
          </Spacing>
        </HeaderContainer>
        <div>
          {!!loading && <Spacing padding="20vh 0">
            <Loader />
          </Spacing>}

          {!loading && !events.length && <Spacing padding="20vh 0">
            <Heading>No events</Heading>
          </Spacing>}

          {!loading && !!events.length && events.map((event, key) => (
            <EventListItem
              onClick={() => this.setState({ active: key })}
              active={key === active}
              key={key}
              event={event}
            />
          ))}
        </div>
      </div>
    );
  }
}

EventList.defaultProps = {
  events: [],
  loading: false
};

