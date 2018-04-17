import React from 'react';
import { EventList } from './EventList';
import { events } from './events.mock';


const EL = () => (
  <EventList
    events={events}
    // loading
  />
);

export { EL as EventList };
