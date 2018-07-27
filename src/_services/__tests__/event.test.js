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

describe('toggle broadcasting', () => {
  afterEach(fetchMock.restore);
  const toggleBroadcastResponse = {
    isBroadcast: true,
    modifiedAt: 123
  };

  it('should toggle an events broadcasting flag', () => {
    const eventId = 1;
    const isBroadcast = true;
    const mock = fetchMock.put(
      `end:events/${eventId}/toggle`,
      toggleBroadcastResponse
    );

    return eventService.toggleBroadcasting(eventId, isBroadcast).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(toggleBroadcastResponse);
    });
  });
});

describe('getInventory', () => {
  afterEach(fetchMock.restore);
  const eventRows = [
    { eventId: 1, row: '1', section: '1' },
    { eventId: 2, row: '2', section: '2' },
    { eventId: 3, row: '3', section: '3' }
  ];

  it('should get all inventory for an event', () => {
    const eventId = 1;
    const mock = fetchMock.get(`end:eventRows?eventId=${eventId}`, eventRows);

    return eventService.getInventory(eventId).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(
        eventRows.map((row) => ({
          ...row,
          id: `${row.eventId}_${row.section}_${row.row}`
        }))
      );
    });
  });
});

describe('updateEventSeats', () => {
  afterEach(fetchMock.restore);

  it('should update eventSeats', () => {
    const updateParams = {
      eventSeats: [1, 2, 3],
      isListed: true
    };

    const mock = fetchMock.post('end:eventRows/_bulk', {
      msg: `${updateParams.eventSeats.length} seats updated`
    });

    return eventService.updateEventSeats().then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual({ msg: '3 seats updated' });
    });

    const eventSeats = [1, 2, 3];
  });
});
