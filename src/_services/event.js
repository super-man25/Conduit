import { getYear } from 'date-fns';
import { get } from '_helpers/api';

function getAll(year = getYear(new Date())) {
  return get('events', { year });
}

export const eventService = {
  getAll
};
