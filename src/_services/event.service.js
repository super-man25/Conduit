import { addDays, subMinutes } from 'date-fns';

function randInt() {
  return Math.random() * 60;
}

function getAll() {
  return Promise.resolve([
    {
      id: 1,
      createdAt: new Date(),
      modifiedAt: addDays(new Date(), -3),
      timestamp: addDays(new Date(), -3),
      promotion: true,
      name: 'Cardinals at Mets'
    }, {
      id: 2,
      createdAt: new Date(),
      modifiedAt: addDays(new Date(), -2),
      timestamp: addDays(new Date(), -2),
      promotion: false,
      name: 'Marlins at Mets'
    }, {
      id: 3,
      createdAt: new Date(),
      modifiedAt: addDays(new Date(), -1),
      timestamp: addDays(new Date(), -1),
      promotion: false,
      name: 'Astros at Mets'
    }, {
      id: 4,
      createdAt: new Date(),
      modifiedAt: new Date(),
      timestamp: new Date(),
      promotion: false,
      name: 'Marlins at Mets'
    }, {
      id: 5,
      createdAt: new Date(),
      modifiedAt: subMinutes(new Date(), randInt()),
      timestamp: addDays(new Date(), 1),
      promotion: true,
      name: 'Nationals at Mets'
    }, {
      id: 6,
      createdAt: new Date(),
      modifiedAt: subMinutes(new Date(), randInt()),
      timestamp: addDays(new Date(), 2),
      promotion: true,
      name: 'Nationals at Mets'
    }, {
      id: 7,
      createdAt: new Date(),
      modifiedAt: subMinutes(new Date(), randInt()),
      timestamp: addDays(new Date(), 3),
      promotion: false,
      name: 'Tigers at Mets'
    }, {
      id: 8,
      createdAt: new Date(),
      modifiedAt: subMinutes(new Date(), randInt()),
      timestamp: addDays(new Date(), 4),
      promotion: false,
      name: 'Astros at Mets'
    }, {
      id: 9,
      createdAt: new Date(),
      modifiedAt: subMinutes(new Date(), randInt()),
      timestamp: addDays(new Date(), 5),
      promotion: false,
      name: 'Yankees at Mets'
    }, {
      id: 10,
      createdAt: new Date(),
      modifiedAt: subMinutes(new Date(), randInt()),
      timestamp: addDays(new Date(), 6),
      promotion: true,
      name: 'Astros at Mets'
    }
  ]);
}

export const eventService = {
  getAll
};
