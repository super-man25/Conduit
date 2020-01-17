import fetchMock from 'fetch-mock';
import { integrationStatService } from '../integrationStats';

const integrations = [
  {
    id: 1,
    name: 'Stubhub',
  },
];

describe('get all', () => {
  afterEach(fetchMock.restore);

  it('should get all integrationStats when passed a seasonId', () => {
    const seasonId = 1;
    const mock = fetchMock.get(
      `end:integrationStats?seasonId=${seasonId}`,
      integrations
    );

    return integrationStatService.getAll({ seasonId }).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(integrations);
    });
  });

  it('should get all integrationStats when passed an eventId', () => {
    const eventId = 1;
    const mock = fetchMock.get(
      `end:integrationStats?eventId=${eventId}`,
      integrations
    );

    return integrationStatService.getAll({ eventId }).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(integrations);
    });
  });
});
