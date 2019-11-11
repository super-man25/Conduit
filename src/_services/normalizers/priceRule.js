import * as yup from 'yup';

export function normalize(priceRule) {
  const { proVenuePricingRule, ...rest } = priceRule;
  return {
    ...rest,
    ...proVenuePricingRule
  };
}

yup.addMethod(yup.number, 'money', function() {
  return this.transform((value, originalValue) => {
    if (!value) return value;
    return parseFloat(value.toFixed(2));
  });
});

const priceRuleSchema = yup.object({
  name: yup.string().nullable(),
  isActive: yup
    .boolean()
    .required()
    .label('Enabled'),
  constant: yup
    .number()
    .money()
    .nullable()
    .label('Dollar change'),
  percent: yup
    .number()
    .integer()
    .nullable()
    .min(-100)
    .max(100)
    .label('Percent change'),
  mirrorPriceScaleId: yup
    .number()
    .nullable()
    .label('Mirror price scale'),
  round: yup
    .string()
    .required()
    .label('Round option'),
  priceFloor: yup
    .number()
    .money()
    .required()
    .min(0)
    .label('Price Floor'),
  priceCeiling: yup
    .number()
    .money()
    .min(0)
    .label('Price Ceiling'),
  externalBuyerTypeIds: yup
    .array(yup.string())
    .required()
    .label('Buyer types'),
  priceScaleIds: yup
    .array(yup.number())
    .required()
    .label('Price scales'),
  eventIds: yup
    .array(yup.number())
    .required()
    .label('Events')
});

export function denormalize(priceRule) {
  return priceRuleSchema.validate(priceRule).catch(handleDenormalizeError);
}

function handleDenormalizeError(error) {
  switch (error.type) {
    case 'typeError':
      error.toString = () => `${error.params.path} is invalid`;
      break;
    case 'required':
      error.toString = () => `${error.params.path} is required`;
      break;
    case 'max':
    case 'min':
      error.toString = () => error.message;
      break;
    case 'integer':
      error.toString = () => `${error.params.path} cannot have a decimal`;
      break;
    default:
      error.toString = () => 'Error saving price rule';
  }
  throw error;
}
