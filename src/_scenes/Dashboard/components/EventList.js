// @flow
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { cssConstants, containerPadding } from '_constants';
import { isPastEvent } from '_helpers';
import {
  actions as eventListActions,
  selectors as eventListSelectors,
} from '_state/eventList';
import { selectors as seasonSelectors } from '_state/season';
import { H4, Input, ScrollableList, Flex, Loader } from '_components';
import { EventListItem } from './EventListItem';

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

function getScrollIndex(events, activeEventId, filtered) {
  if (!events.length) {
    return -1;
  }

  if (filtered) {
    return 0;
  }

  if (activeEventId && activeEventId !== -1) {
    return events.findIndex((e) => e.id === activeEventId);
  }

  const index = events.findIndex((e) => !isPastEvent(e));

  return index;
}

export const EventList = () => {
  const loading = useSelector(
    (state) =>
      state.eventList.loading ||
      state.season.loading ||
      state.seasonStat.loading ||
      state.teamStat.loading
  );
  const activeEventId = useSelector(eventListSelectors.selectActiveEventListId);
  const eventListState = useSelector((state) => state.eventList);
  const { visibleEvents: events, filter } = eventListState;
  const isAdmin = useSelector((state) => state.auth.model.isAdmin);
  const seasonId = useSelector(seasonSelectors.selectActiveSeasonId);

  const dispatch = useDispatch();
  const searchEventList = (value) =>
    dispatch(eventListActions.filterEventList(value));
  const noResult = !events || !events.length;
  const filtered = !!filter;

  useEffect(() => {
    const resetEventList = () => dispatch(eventListActions.resetEventList());
    const fetchEventList = (seasonId) =>
      dispatch(eventListActions.fetchEventList({ seasonId }));
    resetEventList();
    fetchEventList(seasonId);
  }, [dispatch, seasonId]);

  const handleSearchInput = (event: any) => {
    const { value } = event.target;
    searchEventList(value);
  };

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
          scrollIndex={getScrollIndex(events, activeEventId, filtered)}
        >
          {(event, key) => (
            <EventListItem
              key={event.id}
              active={event.id === activeEventId}
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
            onChange={handleSearchInput}
            value={filter}
            data-test-id="event-list-search"
          />
        </SearchContainer>
      </HeaderContainer>

      {loading ? <Loader centered /> : renderContent()}
    </Flex>
  );
};
