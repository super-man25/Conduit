import React from 'react';
import { EventList as Presenter } from './EventList.presenter';
import { events } from './events.mock';

export class EventList extends React.Component {
  state = {
    active: -1
  }

  render() {
    const { active } = this.state;

    return (
      <Presenter
        onClick={(a) => this.setState({ active: a })}
        active={active}
        events={events}
        // loading
      />
    );
  }
}
