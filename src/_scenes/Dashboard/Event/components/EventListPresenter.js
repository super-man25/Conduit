// @flow
import { H4, Input, ScrollableList, Spacing, Flex } from '_components';
import { cssConstants } from '_constants';
import React from 'react';
import styled from 'styled-components';
import { EventListItem } from './EventListItem';
import type { EDEvent } from '_models';
import { isAfter } from 'date-fns';

const OverflowContent = styled.div`
  overflow-y: scroll;
  flex: 1;
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

  const index = events.findIndex((e) => {
    return isAfter(e.timestamp, new Date());
  });

  return index;
}

type Props = {
  activeId: number,
  events: Array<EDEvent>,
  filter: string,
  filterOptions: Array<{ +id: number, +label: string }>,
  isAdmin: boolean,
  loading: boolean,
  onClick: (event: EDEvent) => void,
  onSearchInputChange: (event: SyntheticEvent<KeyboardEvent>) => void,
  title: string
};

export function EventListPresenter(props: Props) {
  const {
    activeId,
    events,
    loading,
    onClick,
    title,
    onSearchInputChange,
    filter,
    isAdmin
  } = props;

  const filtered = !!filter;
  const noResult = !loading && (!events || !events.length);

  return (
    <Flex height="100%" direction="column">
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

      {noResult && (
        <NoContentWrap>
          <Heading data-test-id="no-events-message">
            No events matching query
          </Heading>
        </NoContentWrap>
      )}

      {!noResult && (
        <OverflowContent>
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
                isAdmin={isAdmin}
              />
            )}
          </ScrollableList>
        </OverflowContent>
      )}
    </Flex>
  );
}

EventListPresenter.defaultProps = {
  loading: true
};

export default EventListPresenter;
