import { teamStatService } from './teamStat.service';
import fetchMock from 'fetch-mock';

const teamStat = {
  id: 1,
  createdAt: undefined,
  modifiedAt: undefined,
  clientId: 1,
  wins: 10,
  losses: 10,
  gamesTotal: 50
};

describe('get by Id', () => {
  afterEach(fetchMock.restore);

  it('should get teamStat by id', () => {
    const mock = fetchMock.get('end:teamStatistics?', teamStat);

    return teamStatService.getStats().then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(teamStat);
    });
  });
});
