// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';

import { actions as eventListActions, selectors } from '_state/eventList';
import { selectors as seasonSelectors } from '_state/season';
import { actions as uiActions } from '_state/ui';
import type { State as EventListState } from '_state/eventList';
import { isMobileDevice } from '_helpers';
import EventListPresenter from './EventListPresenter';

type Props = {
  eventListActions: typeof eventListActions,
  eventListState: EventListState,
  activeEventId: number,
  activeSeasonId: number,
  push: (path: string) => void,
  toggleSidebar: () => void,
  isAdmin: boolean,
  loading: boolean,
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
        seasonId: this.props.activeSeasonId,
      });
    }
  }

  handleSearchInput = (event: any) => {
    const { value } = event.target;
    this.props.eventListActions.searchEventList(value);
  };

  handleOnClick = (event) => {
    if (isMobileDevice) this.props.toggleSidebar();

    if (event.id !== this.props.activeEventId) {
      this.props.push(`/event/${event.id}`);
    } else {
      this.props.push(`/season`);
    }
  };

  render() {
    const {
      eventListState: { filterOptions, sortDir, visibleEvents, filter },
      isAdmin,
      activeEventId,
      loading,
    } = this.props;

    return (
      <EventListPresenter
        activeId={activeEventId}
        events={visibleEvents}
        filter={filter}
        filterOptions={filterOptions}
        isAdmin={isAdmin}
        loading={loading}
        onClick={this.handleOnClick}
        onSearchInputChange={this.handleSearchInput}
        timestampSort={sortDir}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    eventListState: state.eventList,
    activeEventId: selectors.selectActiveEventListId(state),
    activeSeasonId: seasonSelectors.selectActiveSeasonId(state),
    loading:
      state.eventList.loading ||
      state.season.loading ||
      state.seasonStat.loading ||
      state.teamStat.loading,
    isAdmin: state.auth.model.isAdmin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    eventListActions: bindActionCreators(eventListActions, dispatch),
    push: (path) => dispatch(push(path)),
    toggleSidebar: bindActionCreators(uiActions.toggleSidebar, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventListContainer);
