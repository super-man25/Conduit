import { buyerTypeService } from '../buyerType';
import fetchMock from 'fetch-mock';

const buyerTypes = [
  {
    id: '3161',
    code: 'ADULT',
    disabled: true,
  },
  {
    id: '3162',
    code: 'CHILD',
    disabled: false,
  },
];

jest.mock('../normalizers/buyerType', () => ({
  denormalize: jest.fn((payload) => Promise.resolve(payload)),
}));

describe('get all', () => {
  afterEach(fetchMock.restore);

  it('should fetch all buyer types', () => {
    const mock = fetchMock.get('end:buyerTypes?seasonId=1', buyerTypes);

    return buyerTypeService.getAll({ seasonId: 1 }).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(buyerTypes);
    });
  });
});

describe('update multiple', () => {
  it('should update multiple buyer types', () => {
    const mock = fetchMock.put('end:buyerTypes/_bulk', `${buyerTypes.length}`);

    return buyerTypeService.updateMultiple(buyerTypes).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(buyerTypes.length);
    });
  });
});
