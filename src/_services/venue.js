import { get } from '_helpers/api';

function getOne(id) {
  return get(`venues/${id}`);
}

function getPriceScales(id) {
  return get(`venues/${id}/priceScales`);
}

export const venueService = {
  getOne,
  getPriceScales,
};
