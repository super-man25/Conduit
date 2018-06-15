import { actions as eventActions } from '_state/event';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import EventListPresenter from '../components/EventListPresenter';

class EventListContainer extends React.Component {
  componentDidMount() {
    this.props.eventActions.fetch();
    this.setActive();
  }

  setActive() {
    const {
      location: { pathname },
      eventState: { activeId }
    } = this.props;

    const [, resource, index] = pathname.split('/');

    const routeIndex = parseInt(index, 10);

    if (resource === 'event' && routeIndex !== activeId) {
      this.props.eventActions.setActive(routeIndex);
    }
  }

  handleSearchInput = (event) => {
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
    this.props.history.push(`/event/${event.id}`);
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
    const { eventState } = this.props;
    const {
      filterOptions,
      sortDir,
      loading,
      visibleEvents,
      selectedFilter,
      activeId
    } = eventState;

    return (
      <EventListPresenter
        onClick={this.handleOnClick}
        activeId={activeId}
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

EventListContainer.propTypes = {
  eventActions: PropTypes.shape(),
  eventState: PropTypes.shape(),
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  history: PropTypes.shape({})
};

function mapStateToProps(state) {
  return {
    eventState: state.event
  };
}

function mapDispatchToProps(dispatch) {
  return {
    eventActions: bindActionCreators(eventActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventListContainer)
);
