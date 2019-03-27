import fetchMock from 'fetch-mock';
import { eventStatService } from '../eventStats';
import { stringify } from 'querystring';

const eventStats = [
  {
    id: 1,
    revenue: 1000,
    inventory: 1000
  }
];

describe('get all', () => {
  afterEach(fetchMock.restore);

  it('should get get all eventStats', () => {
    const eventId = 1;
    const mock = fetchMock.get(`end:timeStats?eventId=${eventId}`, eventStats);

    return eventStatService.getAll({ eventId: 1 }).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(eventStats);
    });
  });

  it('should get all with a startTime', () => {
    const eventId = 1;
    const start = new Date();

    const params = {
      eventId,
      startTime: start.toISOString()
    };

    const mock = fetchMock.get(
      `end:timeStats?${stringify(params)}`,
      eventStats
    );

    return eventStatService.getAll({ eventId, start }).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(eventStats);
    });
  });

  it('should get all with a endTime', () => {
    const eventId = 1;
    const end = new Date();

    const params = {
      eventId,
      endTime: end.toISOString()
    };

    const mock = fetchMock.get(
      `end:timeStats?${stringify(params)}`,
      eventStats
    );

    return eventStatService.getAll({ eventId, end }).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(eventStats);
    });
  });

  it('should get all with a startTime & endTime', () => {
    const eventId = 1;
    const end = new Date();
    const start = new Date();

    const params = {
      eventId,
      startTime: start.toISOString(),
      endTime: end.toISOString()
    };

    const mock = fetchMock.get(
      `end:timeStats?${stringify(params)}`,
      eventStats
    );

    return eventStatService.getAll({ eventId, start, end }).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(eventStats);
    });
  });
});
