import { addDays } from 'date-fns';

export const events = [
  {
    id: 1,
    createdAt: new Date(),
    modifiedAt: new Date('2018-04-12T20:45:23+00:00'),
    timestamp: addDays(new Date(), 1),
    promition: true,
    name: 'St. Louis Cardinals @ New York Mets'
  }, {
    id: 2,
    createdAt: new Date(),
    modifiedAt: new Date(),
    timestamp: addDays(new Date(), 1),
    promition: false,
    name: 'St. Louis Cardinals @ New York Mets'
  }, {
    id: 3,
    createdAt: new Date(),
    modifiedAt: new Date(),
    timestamp: addDays(new Date(), 1),
    promition: false,
    name: 'St. Louis Cardinals @ New York Mets'
  }, {
    id: 4,
    createdAt: new Date(),
    modifiedAt: new Date(),
    timestamp: new Date(),
    promition: false,
    name: 'St. Louis Cardinals @ New York Mets'
  }, {
    id: 5,
    createdAt: new Date(),
    modifiedAt: new Date(),
    timestamp: new Date(),
    promition: true,
    name: 'St. Louis Cardinals @ New York Mets'
  }, {
    id: 6,
    createdAt: new Date(),
    modifiedAt: new Date('2018-04-12T20:45:23+00:00'),
    timestamp: new Date('2018-04-12T20:45:23+00:00'),
    promition: true,
    name: 'St. Louis Cardinals @ New York Mets'
  }, {
    id: 7,
    createdAt: new Date(),
    modifiedAt: new Date(),
    timestamp: new Date(),
    promition: false,
    name: 'St. Louis Cardinals @ New York Mets'
  }, {
    id: 8,
    createdAt: new Date(),
    modifiedAt: new Date(),
    timestamp: new Date(),
    promition: false,
    name: 'St. Louis Cardinals @ New York Mets'
  }, {
    id: 9,
    createdAt: new Date(),
    modifiedAt: new Date(),
    timestamp: new Date(),
    promition: false,
    name: 'St. Louis Cardinals @ New York Mets'
  }, {
    id: 10,
    createdAt: new Date(),
    modifiedAt: new Date(),
    timestamp: new Date(),
    promition: true,
    name: 'St. Louis Cardinals @ New York Mets'
  }
];
