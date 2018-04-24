import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventListPresenter from '../components/EventListPresenter';
import { actions as eventsActions } from '../../../state/events';
import { withRouter } from 'react-router-dom';

const filterOptions = [
  {
    id: 1,
    label: 'All Events'
  }, {
    id: 2,
    label: 'Promotions'
  }
];

function getEventIdFromPath(path) {
  const parts = path.split('/');
  if (parts[1] !== 'event') {
    return null;
  }
  const parsed = parseInt(parts[2]);
  return isNaN(parsed) ? null : parsed;
}

class EventListContainer extends React.Component {
  state = {
    active: -1,
    selectedFilter: 0,
    timestampSort: 'asc'
  }

  componentDidMount() {
    this.props.eventsActions.fetch();
  }

  render() {
    const { selectedFilter, timestampSort } = this.state;
    const { eventsState, location, history } = this.props;

    const activeId = getEventIdFromPath(location.pathname);

    return (
      <EventListPresenter
        onClick={(_, event) => history.push(`/event/${event.id}`)}
        activeId={activeId}
        events={eventsState.model}
        loading={eventsState.loading}
        title="2018 Season"

        filterOptions={filterOptions}
        onFilterSelect={(o, i) => this.setState({ selectedFilter: i })}
        selectedFilter={selectedFilter}

        timestampSort={timestampSort}
        onTimestampSortChange={(curr, next) => this.setState({ timestampSort: next })}
      />
    );
  }
}

EventListContainer.propTypes = {
  eventsActions: PropTypes.shape(),
  eventsState: PropTypes.shape(),
  location: PropTypes.shape({
    pathname: PropTypes.string // eslint-disable-line
  }),
  history: PropTypes.shape({

  })
};

function mapStateToProps(state) {
  return {
    eventsState: state.events
  };
}

function mapActionCreators(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapActionCreators)(EventListContainer));
