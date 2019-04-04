import { denormalize } from '../event';

describe('denormalizer', () => {
  let payload;
  beforeEach(() => {
    payload = {
      percentPriceModifier: 10
    };
  });

  it('should denormalize valid payload', async (done) => {
    let denormalizedPayload = {};
    try {
      denormalizedPayload = await denormalize(payload);
    } catch (err) {
      console.log(err);
    }

    expect(denormalizedPayload).toEqual(payload);

    done();
  });

  it('should throw an error if percentPriceModifier > 50', async (done) => {
    payload.percentPriceModifier = 100;

    let error;
    try {
      await denormalize(payload);
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
      await denormalize(payload);
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
      await denormalize(payload);
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
      await denormalize(payload);
    } catch (err) {
      error = err;
    }
    expect(error.toString()).toEqual('Percent Price Modifier is invalid');

    done();
  });
});
