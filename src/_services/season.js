// @flow
import { get } from '_helpers/api';
import type { EDSeason } from '_models';

function getAll(): Promise<EDSeason[]> {
  return get('seasons');
}

function getOne(id: number): Promise<EDSeason> {
  return get(`seasons/${id}`);
}

export const seasonService = {
  getAll,
  getOne
};
