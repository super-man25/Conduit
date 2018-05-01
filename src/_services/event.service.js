import { normalize } from './event.normalize';
import { getYear } from 'date-fns';
import { get } from '../_helpers/api';

function getAll(year = getYear(new Date())) {
  return get('events', { year }).then((data) => data.map(normalize));
}

export const eventService = {
  getAll
};
