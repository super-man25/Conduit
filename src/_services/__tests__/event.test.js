import { eventService } from '../event';
import fetchMock from 'fetch-mock';

const events = [
  {
    id: 1,
    name: 'Event'
  }
];

describe('get all', () => {
  afterEach(fetchMock.restore);

  it('should get get all with this year', () => {
    const year = new Date().getFullYear();
    const mock = fetchMock.get(`end:events?year=${year}`, events);

    return eventService.getAll({ year }).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(events);
    });
  });

  it('should get all with different year', () => {
    const year = 1999;
    const mock = fetchMock.get(`end:events?year=${year}`, events);

    return eventService.getAll({ year }).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(events);
    });
  });

  it('should get all with a seasonId', () => {
    const seasonId = 1;
    const mock = fetchMock.get(`end:events?seasonId=${seasonId}`, events);

    return eventService.getAll({ seasonId }).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(events);
    });
  });
});
