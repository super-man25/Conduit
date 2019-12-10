import React from 'react';

import { H3, FormInput } from '_components';
import { InputGroup, InputContainer } from './styled';

export const ApiCredentialsSection = () => (
  <>
    <H3 type="tertiary">API Credentials</H3>
    <InputGroup>
      <InputContainer>
        <FormInput
          label="Account ID"
          name="accountId"
          validate={(value) => {
            if (!value) return 'Account ID is required';
            if (isNaN(value)) return 'Account ID must be a number';
          }}
        />
      </InputContainer>
      <InputContainer>
        <FormInput
          label="Api Key"
          name="apiKey"
          validate={(value) => !value && 'Api key is required'}
        />
      </InputContainer>
      <InputContainer>
        <FormInput
          label="Default Vendor ID"
          name="defaultVendorId"
          validate={(value) => {
            if (!value) return 'Default vendor ID is required';
            if (isNaN(value)) return 'Default vendor ID must be a number';
          }}
        />
      </InputContainer>
    </InputGroup>
  </>
);
