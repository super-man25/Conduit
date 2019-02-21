import { denormalize } from '../buyerType';

describe('denormalize', () => {
  let buyerTypesFromState;
  beforeEach(() => {
    buyerTypesFromState = [
      {
        id: '3161',
        code: 'ADULT',
        disabled: true
      },
      {
        id: '3162',
        code: 'CHILD',
        disabled: false
      }
    ];
  });

  it('should denormalize a buyer type', async (done) => {
    let payload;
    try {
      payload = await denormalize(buyerTypesFromState);
    } catch (err) {
      console.log(err);
    }

    expect(payload).toBeInstanceOf(Array);
    expect(payload[0]).toEqual(
      expect.objectContaining({
        externalBuyerTypeId: '3161',
        code: 'ADULT',
        disabled: true
      })
    );

    done();
  });

  it('should throw an error if the id attribute is missing', async (done) => {
    delete buyerTypesFromState[0].id;

    let error;
    try {
      await denormalize(buyerTypesFromState);
    } catch (err) {
      error = err;
    }

    expect(error.toString()).toEqual('Buyer type id is required');
    done();
  });
});
