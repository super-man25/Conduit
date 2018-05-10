import { normalize } from './mlbTeamStats.normalize';

describe('normalize', () => {
  it('should set default values', () => {
    const input = {};
    const output = normalize(input);
    expect(output).toEqual({
      id: undefined,
      createdAt: undefined,
      modifiedAt: undefined,
      clientId: undefined,
      wins: undefined,
      losses: undefined,
      gamesRemaining: undefined
    });
  });

  it('should parse timestamps from integers', () => {
    const unix = 10000;
    const date = new Date(unix);
    const input = {
      createdAt: unix,
      modifiedAt: unix
    };

    expect(normalize(input)).toEqual({
      createdAt: date,
      modifiedAt: date
    });
  });
});
