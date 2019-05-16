import { normalize, denormalize } from '../priceRule';

describe('normalizer', () => {
  it('should normalize price rule', () => {
    const receivedPriceRule = {
      proVenuePricingRule: {
        id: 1,
        constant: 20,
        name: 'sample'
      },
      eventIds: [2, 3]
    };

    const normalizedPriceRule = normalize(receivedPriceRule);

    expect(normalizedPriceRule).toEqual({
      id: 1,
      constant: 20,
      name: 'sample',
      eventIds: [2, 3]
    });
  });
});

describe('denormalizer', () => {
  let priceRuleFromState;
  beforeEach(() => {
    priceRuleFromState = {
      id: 1,
      eventIds: [2],
      externalBuyerTypeIds: ['3161', '3162'],
      priceScaleIds: [15, 22],
      name: 'Twenty bucks off',
      constant: '-20',
      isActive: true,
      round: 'Floor',
      proVenuePricingRule: undefined
    };
  });

  it('should denormalize valid price rule', async () => {
    let denormalizedPriceRule = {};
    try {
      denormalizedPriceRule = await denormalize(priceRuleFromState);
    } catch (err) {
      console.log(err);
    }

    expect(denormalizedPriceRule).toEqual({
      id: 1,
      eventIds: [2],
      externalBuyerTypeIds: ['3161', '3162'],
      priceScaleIds: [15, 22],
      name: 'Twenty bucks off',
      constant: -20,
      isActive: true,
      round: 'Floor'
    });
  });

  it('should throw an error if the wrong type is supplied', async () => {
    priceRuleFromState.constant = 'INVALID';

    let error;
    try {
      await denormalize(priceRuleFromState);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Dollar change is invalid');
  });

  it('should throw an error if a required field is missing or null', async () => {
    priceRuleFromState.priceScaleIds = [];

    let error;
    try {
      await denormalize(priceRuleFromState);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Price scales is required');
  });

  it('should throw an error if value is greater than max', async () => {
    priceRuleFromState.percent = 555;

    let error;
    try {
      await denormalize(priceRuleFromState);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual(
      'Percent change must be less than or equal to 100'
    );
  });

  it('should throw an error if percent change is not an integer', async () => {
    priceRuleFromState.percent = 55.5;

    let error;
    try {
      await denormalize(priceRuleFromState);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Percent change cannot have a decimal');
  });
});
