import { priceRuleService } from '../priceRule';
import fetchMock from 'fetch-mock';

const priceRules = [
  {
    id: 1,
    eventIds: [2],
    externalBuyerTypeIds: ['3161', '3162'],
    priceScaleIds: [15, 22],
    name: 'Twenty bucks off',
    constant: -20,
    isActive: true,
    round: 'Floor'
  }
];

jest.mock('../normalizers/priceRule', () => ({
  normalize: jest.fn((body) => body),
  denormalize: jest.fn((payload) => Promise.resolve(payload))
}));

describe('get all', () => {
  afterEach(fetchMock.restore);

  it('should fetch all price rules', () => {
    const mock = fetchMock.get('end:proVenuePricingRules?', priceRules);

    return priceRuleService.getAll().then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(priceRules);
    });
  });
});

describe('create', () => {
  afterEach(fetchMock.restore);

  it('should create a new price rule', () => {
    const newPriceRuleId = { id: 1 };
    const mock = fetchMock.post('end:proVenuePricingRules', newPriceRuleId);

    return priceRuleService.create(priceRules[0]).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(newPriceRuleId);
    });
  });
});

describe('update', () => {
  afterEach(fetchMock.restore);

  it('should update a price rule', () => {
    const prId = priceRules[0].id;
    const mock = fetchMock.put(`end:proVenuePricingRules/${prId}`, {
      id: prId
    });

    return priceRuleService.update(priceRules[0]).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual({ id: prId });
    });
  });

  it('should fail to update a price rule because there is a conflicting rule', () => {
    const prId = priceRules[0].id;
    const mock = fetchMock.put(`end:proVenuePricingRules/${prId}`, {
      status: 409,
      body: { proVenuePricingRules: [1, 2] }
    });

    const success = jest.fn();

    return priceRuleService
      .update(priceRules[0])
      .then(success)
      .catch((err) => {
        expect(mock.called()).toBe(true);
        expect(err.toString()).toEqual('Conflicts with existing price rule.');
      })
      .then(() => {
        expect(success).not.toBeCalled();
      });
  });

  it('should fail to update a price rule because there is a disbaled buyer type', () => {
    const prId = priceRules[0].id;
    const mock = fetchMock.put(`end:proVenuePricingRules/${prId}`, {
      status: 409,
      body: { excludedBuyerTypes: ['222'] }
    });

    const success = jest.fn();

    return priceRuleService
      .update(priceRules[0])
      .then(success)
      .catch((err) => {
        expect(mock.called()).toBe(true);
        expect(err.toString()).toEqual(
          'Active rule cannot have disabled buyer types.'
        );
      })
      .then(() => {
        expect(success).not.toBeCalled();
      });
  });

  it('should fail to update a price rule because there is a disbaled buyer type and conflicting price rule exists', () => {
    const prId = priceRules[0].id;
    const mock = fetchMock.put(`end:proVenuePricingRules/${prId}`, {
      status: 409,
      body: { excludedBuyerTypes: ['222'], proVenuePricingRules: [1, 2] }
    });

    const success = jest.fn();

    return priceRuleService
      .update(priceRules[0])
      .then(success)
      .catch((err) => {
        expect(mock.called()).toBe(true);
        expect(err.toString()).toEqual(
          'Conflicts with existing price rule. Active rule cannot have disabled buyer types.'
        );
      })
      .then(() => {
        expect(success).not.toBeCalled();
      });
  });
});

describe('get one', () => {
  afterEach(fetchMock.restore);

  it('should fetch a single price rule', () => {
    const prId = priceRules[0].id;
    const mock = fetchMock.get(
      `end:proVenuePricingRules/${prId}?`,
      priceRules[0]
    );

    return priceRuleService.getOne(prId).then((res) => {
      expect(mock.called()).toBe(true);
      expect(res).toEqual(priceRules[0]);
    });
  });
});
