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

  it('should validate percentPriceModifier with valid payload', async (done) => {
    let validatedPayload = {};
    try {
      validatedPayload = await validatePercentPriceModifier(payload);
    } catch (err) {
      console.log(err);
    }

    expect(validatedPayload).toEqual(payload);

    done();
  });

  it('should throw an error if percentPriceModifier > 50', async (done) => {
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

    done();
  });

  it('should throw an error if percentPriceModifier < -50', async (done) => {
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

    done();
  });

  it('should throw an error if percentPriceModifier is not an integer', async (done) => {
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

    done();
  });

  it('should throw an error if percentPriceModifier is null', async (done) => {
    payload.percentPriceModifier = null;

    let error;
    try {
      await validatePercentPriceModifier(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Percent Price Modifier is invalid');

    done();
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

  it('should validate eventScoreModifier with valid payload', async (done) => {
    let validatedPayload = {};
    try {
      validatedPayload = await validateAdminModifiers(payload);
    } catch (err) {
      console.log(err);
    }

    expect(validatedPayload).toEqual(payload);

    done();
  });

  it('should throw an error if eventScoreModifier > 100', async (done) => {
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

    done();
  });

  it('should throw an error if eventScoreModifier < -100', async (done) => {
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

    done();
  });

  it('should throw an error if eventScoreModifier is not a number', async (done) => {
    payload.eventScoreModifier = 'a';

    let error;
    try {
      await validateAdminModifiers(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Event Score Modifier is invalid');

    done();
  });

  it('should throw an error if eventScoreModifier is null', async (done) => {
    payload.eventScoreModifier = null;

    let error;
    try {
      await validateAdminModifiers(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Event Score Modifier is invalid');

    done();
  });

  it('should throw an error if springModifier > 2', async (done) => {
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

    done();
  });

  it('should throw an error if springModifier < -2', async (done) => {
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

    done();
  });

  it('should throw an error if springModifier is not a number', async (done) => {
    payload.springModifier = 'a';

    let error;
    try {
      await validateAdminModifiers(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Spring Modifier is invalid');

    done();
  });

  it('should throw an error if springModifier is null', async (done) => {
    payload.springModifier = null;

    let error;
    try {
      await validateAdminModifiers(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Spring Modifier is invalid');

    done();
  });
});

describe('validator for overridePrice', () => {
  let payload;
  beforeEach(() => {
    payload = {
      overridePrice: 10
    };
  });

  it('should validate overridePrice with valid payload', async (done) => {
    let validatedPayload = {};
    try {
      validatedPayload = await validateOverridePrice(payload);
    } catch (err) {
      console.log(err);
    }

    expect(validatedPayload).toEqual(payload);

    done();
  });

  it('should throw an error if overridePrice is 0', async (done) => {
    payload.overridePrice = 0;

    let error;
    try {
      await validateOverridePrice(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual(
      'Event Seat Override Price must be greater than or equal to 0.01'
    );

    done();
  });

  it('should throw an error if overridePrice < 0', async (done) => {
    payload.overridePrice = -100;

    let error;
    try {
      await validateOverridePrice(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual(
      'Event Seat Override Price must be greater than or equal to 0.01'
    );

    done();
  });

  it('should throw an error if overridePrice is not a number', async (done) => {
    payload.overridePrice = 'a';

    let error;
    try {
      await validateOverridePrice(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Event Seat Override Price is invalid');

    done();
  });

  it('should not throw an error if overridePrice is null', async (done) => {
    let validatedPayload = {};
    payload.overridePrice = null;
    try {
      validatedPayload = await validateOverridePrice(payload);
    } catch (err) {
      console.log(err);
    }

    expect(validatedPayload).toEqual(payload);

    done();
  });
});
