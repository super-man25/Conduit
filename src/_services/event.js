// @flow
import { get } from '_helpers/api';
import { getYear } from 'date-fns';

type GetAllParams = {
  seasonId?: number,
  year?: Date
};

function getAll(params: GetAllParams = { year: getYear(new Date()) }) {
  return get('events', params);
}

export const eventService = {
  getAll
};
