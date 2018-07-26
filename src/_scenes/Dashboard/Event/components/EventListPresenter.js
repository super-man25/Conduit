// @flow

import {
  CalculateRemainingHeight,
  H4,
  Input,
  ScrollableList,
  Spacing
} from '_components';
import { cssConstants } from '_constants';
import React from 'react';
import styled from 'styled-components';
import { EventListItem } from './EventListItem';
import type { EDEvent } from '_models';

const OverflowContent = styled.div`
  height: ${(props) => `${props.height}px`};
  overflow-y: scroll;
`;

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

function getScrollIndex(events, activeId, filtered) {
  if (!events.length) {
    return -1;
  }

  if (filtered) {
    return 0;
  }

  if (activeId && activeId !== -1) {
    return events.findIndex((e) => e.id === activeId);
  }

  return events.findIndex((e) => e.timestamp > new Date());
}

type Props = {
  +filterOptions: Array<{ +id: number, +label: string }>,
  +activeId: number,
  +timestampSort: string,
  +title: string,
  +onSearchInputChange: (event: SyntheticEvent<KeyboardEvent>) => void,
  +onClick: (event: EDEvent) => void,
  +loading: boolean,
  +events: Array<EDEvent>,
  +filter: string
};

export function EventListPresenter(props: Props) {
  const {
    activeId,
    events,
    loading,
    onClick,
    title,
    onSearchInputChange,
    filter
  } = props;

  const filtered = !!filter;
  const noResult = !loading && (!events || !events.length);

  return (
    <CalculateRemainingHeight>
      <HeaderContainer>
        <Spacing padding="24px 40px">
          <Heading>{title}</Heading>
          <Spacing height="4px" />
          <Input
            type="text"
            placeholder="Search"
            onChange={onSearchInputChange}
            value={filter}
            data-test-id="event-list-search"
          />
        </Spacing>
      </HeaderContainer>

      {(height) => (
        <OverflowContent height={height}>
          {noResult && (
            <NoContentWrap>
              <Heading data-test-id="no-events-message">
                No events matching query
              </Heading>
            </NoContentWrap>
          )}

          {!noResult && (
            <ScrollableList
              data={events}
              scrollIndex={getScrollIndex(events, activeId, filtered)}
            >
              {(event, key) => (
                <EventListItem
                  onClick={onClick}
                  active={event.id === activeId}
                  key={event.id}
                  event={event}
                />
              )}
            </ScrollableList>
          )}
        </OverflowContent>
      )}
    </CalculateRemainingHeight>
  );
}

EventListPresenter.defaultProps = {
  loading: true
};

export default EventListPresenter;
