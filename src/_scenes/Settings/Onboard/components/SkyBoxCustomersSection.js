import React from 'react';

import { H3, FormInput, FormInputArray, Dropdown } from '_components';
import { InputGroup, InputContainer } from './styled';
import { cssConstants } from '_constants';

// TODO: Replace hard-coded value
const mapsToOptions = [
  { label: 'StubHub', value: 6 },
  { label: 'Vivid Seats', value: 7 },
  { label: 'Ignored Customer', value: 'ignored' }
];

export const SkyBoxCustomersSection = ({ values }) => {
  const isMapsToValid = ({ form, fieldIndex }) => {
    if (!form.touched.skyBoxCustomers) return false;
    if (
      !form.errors.skyBoxCustomers ||
      !form.errors.skyBoxCustomers[fieldIndex]
    )
      return true;
    return (
      !form.errors.skyBoxCustomers[fieldIndex].mapsTo &&
      form.touched.skyBoxCustomers[fieldIndex].mapsTo
    );
  };

  const isMapsToInvalid = ({ form, fieldIndex }) => {
    if (
      !form.touched.skyBoxCustomers ||
      !form.touched.skyBoxCustomers[fieldIndex]
    )
      return false;
    if (
      !form.errors.skyBoxCustomers ||
      !form.errors.skyBoxCustomers[fieldIndex]
    )
      return false;
    return (
      form.errors.skyBoxCustomers[fieldIndex].mapsTo &&
      form.touched.skyBoxCustomers[fieldIndex].mapsTo
    );
  };

  return (
    <>
      <H3 type="tertiary">SkyBox Customer Info</H3>
      <FormInputArray name="skyBoxCustomers" values={values.skyBoxCustomers}>
        {({ index }) => (
          <InputGroup width="50%">
            <InputContainer>
              <FormInput
                label="SkyBox Customer ID"
                name={`skyBoxCustomers[${index}].skyBoxCustomer`}
                validate={(value) => !value && 'SkyBox customer ID is required'}
              />
            </InputContainer>
            <InputContainer>
              <FormInput
                label="Maps To"
                name={`skyBoxCustomers[${index}].mapsTo`}
                validate={({ value }) => !value && '"Maps to" is required'}
              >
                {({ field, form }) => (
                  <Dropdown
                    noneSelected={'Select a value'}
                    selected={field.value}
                    onChange={(event) => {
                      form.setFieldValue(field.name, event);
                      form.setFieldTouched(field.name, true);
                    }}
                    options={mapsToOptions}
                    parseOption={(option) => option.label}
                    arrowColor={cssConstants.PRIMARY_BLUE}
                    valid={isMapsToValid({ form, fieldIndex: index })}
                    invalid={isMapsToInvalid({ form, fieldIndex: index })}
                  />
                )}
              </FormInput>
            </InputContainer>
          </InputGroup>
        )}
      </FormInputArray>
    </>
  );
};
