import React from 'react';
import styled from 'styled-components';
import { EventListItem } from './EventListItem';
import { cssConstants } from '../../_constants';
import { PropTypes } from 'prop-types';
import { Event as EventModel } from '../../_models';

import {
  Flex,
  H4,
  Input,
  Loader,
  SortableButton,
  DropdownButton,
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
    onClick,
    filterOptions,
    selectedFilter,
    onFilterSelect,
    timestampSort,
    onTimestampSortChange
  } = props;

  return (
    <div>
      <HeaderContainer>
        <Spacing padding="24px 40px">
          <Heading>All Events</Heading>
          <Input type="text" placeholder="Search" />
          <Spacing padding="4px 0 0">
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
  onClick: () => {}
};

EventList.propTypes = {
  /** Index of the currently selected event. Should be -1 if no event is active. */
  active: PropTypes.number,

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
  onTimestampSortChange: SortableButton.propTypes.onClick
};
