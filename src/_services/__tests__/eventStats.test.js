import fetchMock from 'fetch-mock';
import { eventStatService } from '../eventStats';
import { stringify } from 'querystring';
import { toScalaDate } from '_helpers';

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
    const id = 1;
    const mock = fetchMock.get(`end:timeStats?eventId=${id}`, eventStats);

    return eventStatService.getAll().then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(eventStats);
    });
  });

  it('should get all with a startTime', () => {
    const eventId = 1;
    const startTime = new Date();

    const params = {
      eventId,
      startTime: toScalaDate(startTime)
    };

    const mock = fetchMock.get(
      `end:timeStats?${stringify(params)}`,
      eventStats
    );

    return eventStatService.getAll(eventId, startTime).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(eventStats);
    });
  });

  it('should get all with a endTime', () => {
    const eventId = 1;
    const endTime = new Date();

    const params = {
      eventId,
      endTime: toScalaDate(endTime)
    };

    const mock = fetchMock.get(
      `end:timeStats?${stringify(params)}`,
      eventStats
    );

    return eventStatService.getAll(eventId, undefined, endTime).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(eventStats);
    });
  });

  it('should get all with a startTime & endTime', () => {
    const eventId = 1;
    const endTime = new Date();
    const startTime = new Date();

    const params = {
      eventId,
      startTime: toScalaDate(startTime),
      endTime: toScalaDate(endTime)
    };

    const mock = fetchMock.get(
      `end:timeStats?${stringify(params)}`,
      eventStats
    );

    return eventStatService.getAll(eventId, startTime, endTime).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(eventStats);
    });
  });
});
