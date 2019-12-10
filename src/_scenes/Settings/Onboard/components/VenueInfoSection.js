import React from 'react';

import { H3, FormInput, Dropdown } from '_components';
import { InputGroup, InputContainer } from './styled';
import { cssConstants } from '_constants';

// TODO: Replace hard-coded value
const timezoneOptions = [
  { label: 'America/Chicago', value: 'America/Chicago' },
  { label: 'America/New_York', value: 'America/New_York' }
];

export const VenueInfoSection = () => (
  <>
    <H3 type="tertiary">Venue Info</H3>
    <InputGroup>
      <InputContainer>
        <FormInput
          label="Stadium Name"
          name="stadiumName"
          validate={(value) => !value && 'Stadium name is required'}
        />
      </InputContainer>
      <InputContainer>
        <FormInput
          label="Stadium Zip"
          name="stadiumZip"
          validate={(value) => !value && 'Stadium zip is required'}
        />
      </InputContainer>
      <InputContainer>
        <FormInput
          label="Stadium Timezone"
          name="stadiumTimezone"
          validate={({ value }) => !value && 'Stadium timezone is required'}
        >
          {({ field, form }) => (
            <Dropdown
              options={timezoneOptions}
              selected={field.value}
              parseOption={(option) => option.label}
              noneSelected={'Select a timezone'}
              onChange={(event) => {
                form.setFieldValue('stadiumTimezone', event);
                form.setFieldTouched('stadiumTimezone', true);
              }}
              valid={
                !form.errors.stadiumTimezone && form.touched.stadiumTimezone
              }
              invalid={
                form.errors.stadiumTimezone && form.touched.stadiumTimezone
              }
              arrowColor={cssConstants.PRIMARY_BLUE}
            />
          )}
        </FormInput>
      </InputContainer>
      <InputContainer>
        <FormInput
          label="Stadium Capacity"
          name="stadiumCapacity"
          validate={(value) => {
            if (!value) return 'Stadium capacity is required';
            if (isNaN(value)) return 'Stadium capacity must be a number';
          }}
        />
      </InputContainer>
      <InputContainer>
        <FormInput
          label="Stadium Map Url"
          name="stadiumMapUrl"
          validate={(value) => !value && 'Stadium map url is required'}
        />
      </InputContainer>
    </InputGroup>
  </>
);
