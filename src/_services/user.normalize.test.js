import { normalize } from './user.normalize';

describe('normalize', () => {
  it('should set default values', () => {
    const input = {};
    const output = normalize(input);
    expect(output).toEqual({
      id: undefined,
      email: undefined,
      createdAt: undefined,
      modifiedAt: undefined,
      firstName: undefined,
      lastName: undefined,
      clientId: undefined,
      phoneNumber: undefined,
      isAdmin: undefined
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
