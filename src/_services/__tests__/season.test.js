import fetchMock from 'fetch-mock';
import { seasonService } from '../season';

const seasons = [
  {
    id: 1,
    name: 'Event'
  }
];

describe('get all', () => {
  afterEach(fetchMock.restore);

  it('should get get all seasons', () => {
    const mock = fetchMock.get(`end:seasons?`, seasons);

    return seasonService.getAll().then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(seasons);
    });
  });
});

describe('get one', () => {
  afterEach(fetchMock.restore);

  it('should get get a season with a specified id', () => {
    const seasonId = 1;
    const mock = fetchMock.get(`end:seasons/${seasonId}?`, seasons[0]);

    return seasonService.getOne(seasonId).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(seasons[0]);
    });
  });
});
