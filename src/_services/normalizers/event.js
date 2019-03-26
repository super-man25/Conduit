import * as yup from 'yup';

const percentPriceModifierSchema = yup.object({
  percentPriceModifier: yup
    .number()
    .integer()
    .min(-50)
    .max(50)
    .label('Percent change')
});

const adminModifierSchema = yup.object({
  eventScoreModifier: yup
    .number()
    .min(-100)
    .max(100)
    .label('Event Score Modifier'),
  springModifier: yup
    .number()
    .min(-2)
    .max(2)
    .label('Spring Modifier')
});

export function denormalize(body) {
  return percentPriceModifierSchema
    .validate(body)
    .catch(handleDenormalizeError);
}

export function denormalizeAdminModifiers(body) {
  return adminModifierSchema.validate(body).catch(handleDenormalizeError);
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
      error.toString = () => `Error saving ${error.path || 'modifier'}`;
  }
  throw error;
}
