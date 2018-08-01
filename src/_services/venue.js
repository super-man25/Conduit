import { get } from '_helpers/api';

function getOne(id) {
  return get(`venues/${id}`);
}

function getPriceScales(id) {
  return get(`venues/${id}/priceScales`);
}

function getSvgMappings(id) {
  return get(`venues/${id}/svgMappings`);
}

export const venueService = {
  getOne,
  getPriceScales,
  getSvgMappings
};
