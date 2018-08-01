// @flow
import { actions as eventListActions, selectors } from '_state/eventList';
import { selectors as seasonSelectors } from '_state/season';
import type { State as EventListState } from '_state/eventList';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventListPresenter from '../components/EventListPresenter';
import { push } from 'connected-react-router';

type Props = {
  eventListActions: typeof eventListActions,
  eventListState: EventListState,
  activeEventId: number,
  activeSeasonId: number,
  push: (path: string) => void
};

class EventListContainer extends React.Component<Props> {
  componentDidMount() {
    const { activeSeasonId } = this.props;
    if (activeSeasonId > 0) {
      this.props.eventListActions.fetchEventList({ seasonId: activeSeasonId });
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.activeSeasonId !== prevProps.activeSeasonId) {
      this.props.eventListActions.resetEventList();
      this.props.eventListActions.fetchEventList({
        seasonId: this.props.activeSeasonId
      });
    }
  }

  handleSearchInput = (event: any) => {
    const { value } = event.target;
    this.props.eventListActions.searchEventList(value);
  };

  handleSelectedFilter = (event) => {
    console.log('selected filter', event);
  };

  handleTimestampSortChange = (event) => {
    console.log('timestamp sort direction', event);
  };

  handleOnClick = (event) => {
    if (event.id !== this.props.activeEventId) {
      this.props.push(`/event/${event.id}`);
    } else {
      this.props.push(`/season`);
    }
  };

  get title() {
    return 'Events';
  }

  render() {
    const {
      eventListState: {
        filterOptions,
        sortDir,
        loading,
        visibleEvents,
        selectedFilter,
        filter
      },
      activeEventId
    } = this.props;

    return (
      <EventListPresenter
        onClick={this.handleOnClick}
        activeId={activeEventId}
        events={visibleEvents}
        loading={loading}
        title={this.title}
        filterOptions={filterOptions}
        onFilterSelect={this.handleSelectedFilter}
        selectedFilter={selectedFilter}
        timestampSort={sortDir}
        onTimestampSortChange={this.handleTimestampSortChange}
        onSearchInputChange={this.handleSearchInput}
        filter={filter}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    eventListState: state.eventList,
    activeEventId: selectors.selectActiveEventListId(state),
    activeSeasonId: seasonSelectors.selectActiveSeasonId(state),
    loading: state.eventList.loading || state.season.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    eventListActions: bindActionCreators(eventListActions, dispatch),
    push: (path) => dispatch(push(path))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer);
