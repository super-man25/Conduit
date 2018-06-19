// @flow
import { actions as eventActions } from '_state/event';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventListPresenter from '../components/EventListPresenter';
import { push } from 'connected-react-router';
import { EDEvent } from '_models';
import { getActiveEventId } from '_state/event/selectors';

type Props = {
  eventActions: {
    fetch: () => void,
    setActive: (value: number) => void,
    search: (term: string) => void
  },
  eventState: {
    filterOptions: Array<{ id: number, label: string }>,
    sortDir: string,
    loading: boolean,
    filter: string,
    events: EDEvent[],
    visibleEvents: EDEvent[],
    selectedFilter: number,
    activeId: number
  },
  selectors: {
    activeEventId: number
  },
  location: {
    pathname: string
  },
  push: (path: string) => void
};

class EventListContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.eventActions.fetch();
  }

  handleSearchInput = (event: any) => {
    const { value } = event.target;
    this.props.eventActions.search(value);
  };

  handleSelectedFilter = (event) => {
    console.log('selected filter', event);
  };

  handleTimestampSortChange = (event) => {
    console.log('timestamp sort direction', event);
  };

  handleOnClick = (event) => {
    this.props.push(`/event/${event.id}`);
    this.props.eventActions.setActive(event.id);
  };

  get title() {
    return 'Events';
  }

  get scrollIndex() {
    const { events, activeId, filter } = this.props.eventState;

    if (events.length > 0) {
      if (filter) {
        return 0; // scroll to the top
      }

      if (activeId) {
        return events.findIndex((e) => e.id === activeId);
      }

      return events.findIndex((e) => e.timestamp > new Date());
    }

    return -1;
  }

  render() {
    const {
      eventState: {
        filterOptions,
        sortDir,
        loading,
        visibleEvents,
        selectedFilter
      },
      selectors: { activeEventId }
    } = this.props;

    return (
      <EventListPresenter
        onClick={this.handleOnClick}
        activeId={activeEventId}
        scrollIndex={this.scrollIndex}
        events={visibleEvents}
        loading={loading}
        title={this.title}
        filterOptions={filterOptions}
        onFilterSelect={this.handleSelectedFilter}
        selectedFilter={selectedFilter}
        timestampSort={sortDir}
        onTimestampSortChange={this.handleTimestampSortChange}
        onSearchInputChange={this.handleSearchInput}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    eventState: state.event,
    location: state.router.location,
    selectors: {
      activeEventId: getActiveEventId(state)
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    eventActions: bindActionCreators(eventActions, dispatch),
    push: (path) => dispatch(push(path))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer);
