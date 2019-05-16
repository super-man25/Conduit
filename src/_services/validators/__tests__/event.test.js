import {
  validatePercentPriceModifier,
  validateAdminModifiers,
  validateOverridePrice
} from '../event';

describe('validator for percentPriceModifier', () => {
  let payload;
  beforeEach(() => {
    payload = {
      percentPriceModifier: 10
    };
  });

  it('should validate percentPriceModifier with valid payload', async () => {
    const validatedPayload = await validatePercentPriceModifier(payload);
    expect(validatedPayload).toEqual(payload);
  });

  it('should throw an error if percentPriceModifier > 50', async () => {
    payload.percentPriceModifier = 100;

    let error;
    try {
      await validatePercentPriceModifier(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual(
      'Percent Price Modifier must be less than or equal to 50'
    );
  });

  it('should throw an error if percentPriceModifier < -50', async () => {
    payload.percentPriceModifier = -100;

    let error;
    try {
      await validatePercentPriceModifier(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual(
      'Percent Price Modifier must be greater than or equal to -50'
    );
  });

  it('should throw an error if percentPriceModifier is not an integer', async () => {
    payload.percentPriceModifier = 10.1;

    let error;
    try {
      await validatePercentPriceModifier(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual(
      'Percent Price Modifier must be an integer'
    );
  });

  it('should throw an error if percentPriceModifier is null', async () => {
    payload.percentPriceModifier = null;

    let error;
    try {
      await validatePercentPriceModifier(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Percent Price Modifier is invalid');
  });
});

describe('validator for eventScoreModifier and springModifier', () => {
  let payload;
  beforeEach(() => {
    payload = {
      eventScoreModifier: 50,
      springModifier: 0.1
    };
  });

  it('should validate eventScoreModifier with valid payload', async () => {
    const validatedPayload = await validateAdminModifiers(payload);
    expect(validatedPayload).toEqual(payload);
  });

  it('should throw an error if eventScoreModifier > 100', async () => {
    payload.eventScoreModifier = 200;

    let error;
    try {
      await validateAdminModifiers(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual(
      'Event Score Modifier must be less than or equal to 100'
    );
  });

  it('should throw an error if eventScoreModifier < -100', async () => {
    payload.eventScoreModifier = -200;

    let error;
    try {
      await validateAdminModifiers(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual(
      'Event Score Modifier must be greater than or equal to -100'
    );
  });

  it('should throw an error if eventScoreModifier is not a number', async () => {
    payload.eventScoreModifier = 'a';

    let error;
    try {
      await validateAdminModifiers(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Event Score Modifier is invalid');
  });

  it('should throw an error if eventScoreModifier is null', async () => {
    payload.eventScoreModifier = null;

    let error;
    try {
      await validateAdminModifiers(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Event Score Modifier is invalid');
  });

  it('should throw an error if springModifier > 2', async () => {
    payload.springModifier = 5;

    let error;
    try {
      await validateAdminModifiers(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual(
      'Spring Modifier must be less than or equal to 2'
    );
  });

  it('should throw an error if springModifier < -2', async () => {
    payload.springModifier = -5;

    let error;
    try {
      await validateAdminModifiers(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual(
      'Spring Modifier must be greater than or equal to -2'
    );
  });

  it('should throw an error if springModifier is not a number', async () => {
    payload.springModifier = 'a';

    let error;
    try {
      await validateAdminModifiers(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Spring Modifier is invalid');
  });

  it('should throw an error if springModifier is null', async () => {
    payload.springModifier = null;

    let error;
    try {
      await validateAdminModifiers(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Spring Modifier is invalid');
  });
});

describe('validator for overridePrice', () => {
  let payload;
  beforeEach(() => {
    payload = {
      overridePrice: 10
    };
  });

  it('should validate overridePrice with valid payload', async () => {
    const validatedPayload = await validateOverridePrice(payload);
    expect(validatedPayload).toEqual(payload);
  });

  it('should allow an overridePrice of $0.01', async () => {
    payload.overridePrice = 0.01;
    const validatedPayload = await validateOverridePrice(payload);
    expect(validatedPayload).toEqual(payload);
  });

  it('should throw an error if overridePrice < 0', async () => {
    payload.overridePrice = -1;

    let error;
    try {
      await validateOverridePrice(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Price must be greater than 0');
  });

  it('should throw an error if overridePrice = 0', async () => {
    payload.overridePrice = 0;

    let error;
    try {
      await validateOverridePrice(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Price must be greater than 0');
  });

  it('should throw an error if overridePrice is not a number', async () => {
    payload.overridePrice = 'a';

    let error;
    try {
      await validateOverridePrice(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Price is invalid');
  });

  it('should not throw an error if overridePrice is null', async () => {
    payload.overridePrice = null;
    const validatedPayload = await validateOverridePrice(payload);
    expect(validatedPayload).toEqual(payload);
  });
});
