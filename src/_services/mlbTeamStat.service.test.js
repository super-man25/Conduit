import { mlbTeamStatService } from './mlbTeamStat.service';
import fetchMock from 'fetch-mock';

const mlbTeamStat = {
  id: 1,
  createdAt: undefined,
  modifiedAt: undefined,
  clientId: 1,
  wins: 10,
  losses: 10,
  gamesRemaining: 50
};

describe('get by Id', () => {
  afterEach(fetchMock.restore);

  it('should get mlbTeamStat by id', () => {
    const mock = fetchMock.get('end:mlb/teamStats?', mlbTeamStat);

    return mlbTeamStatService.getStats().then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(mlbTeamStat);
    });
  });
});
