// @flow

import {
  CalculateRemainingHeight,
  DropdownButton,
  Flex,
  H4,
  Input,
  ScrollableList,
  SortableButton,
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

type Props = {
  filterOptions: {},
  activeId: number,
  timestampSort: string,
  title: string,
  onSearchInputChange: (event: SyntheticEvent<KeyboardEvent>) => void,
  onClick: (event: EDEvent) => void,
  loading: boolean,
  events: Array<EDEvent>,
  onFilterSelect: (event: EDEvent) => void,
  onTimestampSortChange: (dir: string) => void,
  selectedFilter: (event: EDEvent) => void,
  scrollIndex: ?number
};

export function EventListPresenter(props: Props) {
  const {
    activeId,
    events,
    filterOptions,
    loading,
    onClick,
    onFilterSelect,
    onTimestampSortChange,
    selectedFilter,
    timestampSort,
    title,
    onSearchInputChange,
    scrollIndex
  } = props;

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
            data-test-id="event-list-search"
          />
          <Spacing height="4px" />
          <Flex direction="row" justify="space-between">
            <SortableButton
              direction={timestampSort}
              onClick={onTimestampSortChange}
            >
              Upcoming
            </SortableButton>
            <DropdownButton
              options={filterOptions}
              parseLabel={(o) => o.label}
              selected={selectedFilter}
              onSelect={onFilterSelect}
            />
          </Flex>
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

          <ScrollableList data={events} scrollIndex={scrollIndex}>
            {(event, key) => (
              <EventListItem
                onClick={() => onClick(event)}
                active={event.id === activeId}
                key={key}
                event={event}
              />
            )}
          </ScrollableList>
        </OverflowContent>
      )}
    </CalculateRemainingHeight>
  );
}

EventListPresenter.defaultProps = {
  loading: true
};

export default EventListPresenter;
