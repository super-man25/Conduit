import * as yup from 'yup';

yup.addMethod(yup.number, 'money', function() {
  return this.transform((value, originalValue) => {
    if (!value) return value;
    return parseFloat(value.toFixed(2));
  });
});

const secondaryPriceRuleSchema = yup.object({
  percent: yup
    .number()
    .nullable()
    .min(-100)
    .max(100)
    .label('Percent change'),
  constant: yup
    .number()
    .money()
    .nullable()
    .label('Dollar change'),
});

export function denormalize(body) {
  return secondaryPriceRuleSchema.validate(body).catch(handleDenormalizeError);
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
      error.toString = () => 'Error saving client integration';
  }
  throw error;
}
