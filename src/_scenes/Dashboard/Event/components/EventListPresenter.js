// @flow

import {
  CalculateRemainingHeight,
  DropdownButton,
  Flex,
  H4,
  Input,
  Loader,
  ScrollableList,
  SortableButton,
  Spacing
} from '_components';
import { cssConstants } from '_constants';
import { Event as EventModel } from '_models';
import { PropTypes } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { EventListItem } from './EventListItem';

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
  onSearchInputChange: (event: {}) => void,
  onClick: (event: {}) => void,
  loading: boolean,
  events: Array<{}>,
  onFilterSelect: (event: {}) => void,
  onTimestampSortChange: (event: {}) => void,
  selectedFilter: (event: {}) => void,
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
          {loading && (
            <Spacing padding="10vh 0">
              <Loader />
            </Spacing>
          )}

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

EventListPresenter.propTypes = {
  /** ID of the currently active event. */
  activeId: PropTypes.number,

  /** List of events */
  events: PropTypes.arrayOf(EventModel),

  /** Whether or not the list is loading. Defaults to false. */
  loading: PropTypes.bool,

  /** Callback fired when a list item is clicked. Called with the event item key and object. */
  onClick: PropTypes.func,

  /** Options for the filter */
  filterOptions: DropdownButton.propTypes.options,

  /** The selected filter */
  selectedFilter: DropdownButton.propTypes.selected,

  /** Callback fired when a filter is selected */
  onFilterSelect: DropdownButton.propTypes.onSelect,

  /** Sort direction for timestamp */
  timestampSort: SortableButton.propTypes.direction,

  /** Callback fired when the timestamp sort direction is changed */
  onTimestampSortChange: SortableButton.propTypes.onClick,

  /** Title to show at the top of the list */
  title: PropTypes.string,

  /** Callback for search input */
  onSearchInputChange: PropTypes.func
};

export default EventListPresenter;
