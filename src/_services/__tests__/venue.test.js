import fetchMock from 'fetch-mock';
import { venueService } from '../venue';

describe('venueService', () => {
  afterEach(fetchMock.restore);

  it('getOne should fetch a single venue', () => {
    const venue = {
      id: 1,
      name: 'Mets',
      svgUrl: 'url'
    };
    const id = 1;
    const mock = fetchMock.get(`end:venues/${id}?`, venue);

    return venueService.getOne(id).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(venue);
    });
  });

  it('getPriceScales should fetch the priceScales for a venue', () => {
    const priceScales = [1, 2, 3];
    const id = 1;
    const mock = fetchMock.get(`end:venues/${id}/priceScales?`, priceScales);

    return venueService.getPriceScales(id).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(priceScales);
    });
  });
});
