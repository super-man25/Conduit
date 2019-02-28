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
    .integer()
    .nullable()
    .min(0)
    .max(100)
    .label('Percent change'),
  constant: yup
    .number()
    .money()
    .nullable()
    .min(0)
    .label('Dollar change')
});
