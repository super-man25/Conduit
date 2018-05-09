import { normalize } from './eventStats.normalize';
import { subDays, addDays, isFuture, addHours, isAfter } from 'date-fns';
// import { get } from '../_helpers/api';

function mockGetAll() {
  let id = 0;
  let inventory = 15000;
  let revenue = 0;
  let curr = subDays(new Date(), 40);
  const end = addDays(new Date(), 40);

  const data = [];

  while (!isAfter(curr, end)) {
    data.push({
      id: id++,
      eventId: id++,
      date: curr,
      createdAt: new Date(),
      modifiedAt: new Date(),
      inventory: (inventory -= Math.floor(Math.random() * 10)),
      revenue: (revenue += Math.floor(Math.random() * 1000)),
      isProjected: isFuture(curr)
    });

    curr = addHours(curr, 1);
  }

  return Promise.resolve(data);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// start/end/eventId will be used when service is built
function getAll(/* start, end, eventId */) {
  return delay(1000).then(() =>
    mockGetAll().then((data) => data.map(normalize))
  );

  // return get('eventTimeStats', { start, end, eventId }).then((data) =>
  //   data.map(normalize)
  // );
}

export const eventStatsService = {
  getAll
};
