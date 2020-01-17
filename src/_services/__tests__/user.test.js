import { userService } from '../user';
import fetchMock from 'fetch-mock';

const user = {
  id: 1,
  email: 'test@dialexa.com',
  firstName: 'test',
  lastName: 'user',
};

const updatedUser = {
  id: 1,
  email: 'test@dialexa.com',
  firstName: 'test1',
  lastName: 'user1',
};

const forgotEmail = {
  email: 'test@dialexa.com',
};

describe('get by Id', () => {
  afterEach(fetchMock.restore);

  it('should get user by id', () => {
    const id = 1;
    const mock = fetchMock.get(`end:users/${id}?`, user);

    return userService.getById(id).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(user);
    });
  });
});

describe('update user info', () => {
  afterEach(fetchMock.restore);

  it('should update user personal info', () => {
    const mock = fetchMock.put('end:users', updatedUser);

    return userService.update(user).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(updatedUser);
    });
  });
});

describe('update user email', () => {
  afterEach(fetchMock.restore);

  it('should update user email', () => {
    const mock = fetchMock.put('end:users/email', updatedUser);

    return userService.updateEmail(user).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(updatedUser);
    });
  });
});

describe('change password', () => {
  afterEach(fetchMock.restore);

  it('should change users password', () => {
    const mock = fetchMock.put('end:users/password', user);

    return userService.changePassword(user).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(user);
    });
  });
});

describe('forgot password', () => {
  afterEach(fetchMock.restore);

  it('should change users password', () => {
    const mock = fetchMock.post('end:users/forgot', forgotEmail);

    return userService.forgotPass(forgotEmail).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(forgotEmail);
    });
  });
});
