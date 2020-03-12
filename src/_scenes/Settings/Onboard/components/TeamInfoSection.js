import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
  format as dateFnsFormat,
  parse as dateFnsParse,
  isAfter,
  isBefore,
} from 'date-fns';

import { H3, Input, Dropdown, FormInput } from '_components';
import { InputGroup, InputContainer } from './styled';

const dateFormat = 'MM/dd/yyyy';

function parseDate(dateString) {
  const parsed = dateFnsParse(dateString);
  return DateUtils.isDate(parsed) ? parsed : undefined;
}

function formatDate(date) {
  return dateFnsFormat(date, dateFormat);
}

// TODO: Replace hard-coded value
const leagueOptions = [
  { label: 'NHL', value: 'NHL' },
  { label: 'MLS', value: 'MLS' },
  { label: 'MLB', value: 'MLB' },
  { label: 'NCAAB', value: 'NCAAB' },
  { label: 'NCAAF', value: 'NCAAF' },
  { label: 'NFL', value: 'NFL' },
];

export const TeamInfoSection = ({ values }) => (
  <>
    <H3 type="tertiary">Team Info</H3>
    <InputGroup>
      <InputContainer>
        <FormInput
          label="Team Name"
          name="team"
          validate={(value) => !value && 'Team name is required'}
        />
      </InputContainer>
      <InputContainer>
        <FormInput
          label="League"
          name="league"
          validate={({ value }) => !value && 'League is required'}
        >
          {({ field, form }) => (
            <Dropdown
              options={leagueOptions}
              handleChange={(selectedOption) => {
                form.setFieldValue('league', selectedOption.label);
                form.setFieldTouched('league', true);
              }}
              // selected={field.value}
              // parseOption={(option) => option.label}
              // noneSelected={'Select a league'}
              // onChange={(event) => {
              //   form.setFieldValue('league', event);
              //   form.setFieldTouched('league', true);
              // }}
              // valid={!form.errors.league && form.touched.league}
              // invalid={form.errors.league && form.touched.league}
              // arrowColor={colors.blue}
            />
          )}
        </FormInput>
      </InputContainer>
      <InputContainer>
        <FormInput
          label="Season Name"
          name="seasonName"
          validate={(value) => !value && 'Season name is required'}
        />
      </InputContainer>
      <InputContainer quarterWidth>
        <FormInput
          label="Season Start Date"
          name="seasonStart"
          validate={(value) => {
            if (value === undefined) return 'Season start must be valid date';
            if (!value) return 'Season start is required';
            if (isAfter(value, values.seasonEnd))
              return 'Season start must be before end';
          }}
        >
          {({ field, form }) => (
            <DayPickerInput
              onDayChange={(date) => form.setFieldValue('seasonStart', date)}
              component={Input}
              inputProps={{
                ...field,
                valid: !form.errors.seasonStart && form.touched.seasonStart,
                invalid: form.errors.seasonStart && form.touched.seasonStart,
              }}
              formatDate={formatDate}
              parseDate={parseDate}
              placeholder="mm/dd/yyyy"
            />
          )}
        </FormInput>
      </InputContainer>
      <InputContainer quarterWidth>
        <FormInput
          label="Season End Date"
          name="seasonEnd"
          validate={(value) => {
            if (value === undefined) return 'Season end must be valid date';
            if (!value) return 'Season end is required';
            if (isBefore(value, values.seasonStart))
              return 'Season end must be after start';
          }}
        >
          {({ field, form }) => (
            <DayPickerInput
              onDayChange={(date) => form.setFieldValue('seasonEnd', date)}
              classNames={{
                container: 'DayPickerInput-Container',
                overlayWrapper: 'DayPickerInput-OverlayWrapper',
                overlay:
                  'DayPickerInput-Overlay DayPickerInput-Overlay--AlignRight',
              }}
              component={Input}
              inputProps={{
                ...field,
                valid: !form.errors.seasonEnd && form.touched.seasonEnd,
                invalid: form.errors.seasonEnd && form.touched.seasonEnd,
              }}
              valid={!form.errors.seasonEnd && form.touched.seasonEnd}
              invalid={form.errors.seasonEnd && form.touched.seasonEnd}
              formatDate={formatDate}
              parseDate={parseDate}
              placeholder="mm/dd/yyyy"
            />
          )}
        </FormInput>
      </InputContainer>
      <InputContainer>
        <FormInput
          label="Logo URL"
          name="logoUrl"
          validate={(value) => !value && 'Logo url is required'}
        />
      </InputContainer>
    </InputGroup>
  </>
);
