import * as yup from 'yup';

const percentPriceModifierSchema = yup.object({
  percentPriceModifier: yup
    .number()
    .integer()
    .nullable()
    .min(-50)
    .max(50)
    .label('Percent change')
});

export function denormalize(body) {
  return percentPriceModifierSchema
    .validate(body)
    .catch(handleDenormalizeError);
}

function handleDenormalizeError(error) {
  switch (error.type) {
    case 'typeError':
      error.toString = () => `${error.params.path} is invalid`;
      break;
    case 'max':
    case 'min':
    case 'integer':
      error.toString = () => error.message;
      break;
    default:
      error.toString = () => 'Error saving price modifier';
  }
  throw error;
}
