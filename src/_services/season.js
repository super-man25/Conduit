// @flow
import { get, post } from '_helpers/api';
import type { EDSeason } from '_models';

function getAll(): Promise<EDSeason[]> {
  return get('seasons');
}

function getOne(id: number): Promise<EDSeason> {
  return get(`seasons/${id}`);
}

function priceAllEvents(seasonId: number) {
  return post(`seasons/${seasonId}/priceAll`).catch(handleResponseError);
}

function handleResponseError(error) {
  switch (error.code) {
    case 400:
      error.toString = () => error.body.message;
      break;
    default:
      error.toString = () => 'Error saving modifier';
  }
  throw error;
}

export const seasonService = {
  getAll,
  getOne,
  priceAllEvents,
};
