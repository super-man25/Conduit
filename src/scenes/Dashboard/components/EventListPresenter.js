import React from 'react';
import styled from 'styled-components';
import { EventListItem } from './EventListItem';
import { cssConstants } from '../../../_constants';
import { PropTypes } from 'prop-types';
import { Event as EventModel } from '../../../_models';

import {
  Flex,
  H4,
  Input,
  Loader,
  SortableButton,
  DropdownButton,
  Spacing
} from '../../../_components';

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

const EventListPresenter = (props) => {
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
    title
  } = props;

  return (
    <div>
      <HeaderContainer>
        <Spacing padding="24px 40px">
          <Heading>{title}</Heading>
          <Spacing height="4px" />
          <Input type="text" placeholder="Search" />
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
      <div>
        {!!loading && <Spacing padding="10vh 0">
          <Loader />
        </Spacing>}

        {!loading && (!events || !events.length) && <NoContentWrap>
          <Heading>No events matching query</Heading>
        </NoContentWrap>}

        {!loading && !!events && !!events.length && events.map((event, key) => (
          <EventListItem
            onClick={() => onClick(key, event)}
            active={event.id === activeId}
            key={key}
            event={event}
          />
        ))}
      </div>
    </div>
  );
};

EventListPresenter.defaultProps = {
  events: [],
  loading: false,
  onClick: () => {}
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
  title: PropTypes.string
};

export default EventListPresenter;