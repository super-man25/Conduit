import * as yup from 'yup';

const buyerTypeDisabledUpdateSchema = yup.array().of(
  yup
    .object({
      externalBuyerTypeId: yup
        .string()
        .required()
        .label('Buyer type id'),
      disabled: yup
        .boolean()
        .required()
        .label('Disabled'),
    })
    .from('id', 'externalBuyerTypeId')
);

export function denormalize(buyerTypes) {
  return buyerTypeDisabledUpdateSchema
    .validate(buyerTypes)
    .catch(handleDenormalizeError);
}

function handleDenormalizeError(error) {
  switch (error.type) {
    case 'typeError':
      error.toString = () => `${error.params.path} is invalid`;
      break;
    case 'required':
      error.toString = () => `${error.params.path} is required`;
      break;
    default:
      error.toString = () => 'Error saving buyer type';
  }

  throw error;
}
