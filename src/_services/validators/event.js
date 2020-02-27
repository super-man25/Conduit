import * as yup from 'yup';

const percentPriceModifierSchema = yup.object({
  percentPriceModifier: yup
    .number()
    .integer()
    .min(-50)
    .max(50)
    .label('Percent Price Modifier'),
});

const adminModifierSchema = yup.object({
  eventScoreModifier: yup.number().label('Event Score Modifier'),
  springModifier: yup
    .number()
    .min(-2)
    .max(2)
    .label('Spring Modifier'),
  reasonType: yup.string().nullable(),
  reasonComments: yup.string().nullable(),
});

const overridePriceSchema = yup.object({
  overridePrice: yup
    .number()
    .moreThan(0)
    .nullable()
    .label('Price'),
  isListed: yup.boolean(),
});

export function validatePercentPriceModifier(body) {
  return validate(body, percentPriceModifierSchema);
}

export function validateAdminModifiers(body) {
  return validate(body, adminModifierSchema);
}

export function validateOverridePrice(body) {
  return validate(body, overridePriceSchema);
}

function validate(body, schema) {
  return schema.validate(body).catch(handleValidationError);
}

function handleValidationError(error) {
  switch (error.type) {
    case 'typeError':
      error.toString = () => `${error.params.path} is invalid`;
      break;
    case 'max':
    case 'min':
    case 'moreThan':
    case 'integer':
      error.toString = () => error.message;
      break;
    default:
      error.toString = () => `Error saving ${error.path || 'modifier'}`;
  }
  throw error;
}
