import React from 'react';
import { EventList as Presenter } from './EventList.presenter';
import { events } from './events.mock';

const filterOptions = [
  {
    id: 1,
    label: 'All Events'
  }, {
    id: 2,
    label: 'Promotions'
  }
];

export class EventList extends React.Component {
  state = {
    active: -1,
    selectedFilter: 0,
    timestampSort: 'asc'
  }

  render() {
    const { active, selectedFilter, timestampSort } = this.state;

    return (
      <Presenter
        onClick={(a) => this.setState({ active: a })}
        active={active}
        events={events}

        filterOptions={filterOptions}
        onFilterSelect={(o, i) => this.setState({ selectedFilter: i })}
        selectedFilter={selectedFilter}

        timestampSort={timestampSort}
        onTimestampSortChange={(curr, next) => this.setState({ timestampSort: next })}

        // loading
      />
    );
  }
}
