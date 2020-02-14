// @flow
import { H4, Input, ScrollableList, Flex, CenteredLoader } from '_components';
import { cssConstants, containerPadding } from '_constants';
import React from 'react';
import styled from 'styled-components';
import { EventListItem } from './EventListItem';
import type { EDEvent } from '_models';
import { isPastEvent } from '_helpers';

const OverflowContent = styled.div`
  overflow-y: scroll;
  flex-grow: 1;
  flex-basis: 0;
`;

const Heading = styled(H4)`
  margin: 0;
  padding: 0;
  font-weight: bold;
  letter-spacing: 0.9px;
`;

const HeaderContainer = styled.div`
  border-bottom: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
`;

const SearchContainer = styled.div`
  padding: ${containerPadding}px;
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
    return !isPastEvent(e);
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
  onSearchInputChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
};

export function EventListPresenter(props: Props) {
  const {
    activeId,
    events,
    loading,
    onClick,
    onSearchInputChange,
    filter,
    isAdmin,
  } = props;

  const filtered = !!filter;
  const noResult = !events || !events.length;

  const renderContent = () => {
    if (noResult) {
      return (
        <NoContentWrap>
          <Heading data-test-id="no-events-message">
            No events matching query
          </Heading>
        </NoContentWrap>
      );
    }
    return (
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
    );
  };

  return (
    <Flex height="100%" direction="column" position="relative">
      <HeaderContainer>
        <SearchContainer>
          <Input
            type="text"
            placeholder="Filter..."
            onChange={onSearchInputChange}
            value={filter}
            data-test-id="event-list-search"
          />
        </SearchContainer>
      </HeaderContainer>

      {loading ? <CenteredLoader /> : renderContent()}
    </Flex>
  );
}

EventListPresenter.defaultProps = {
  loading: true,
};

export default EventListPresenter;
