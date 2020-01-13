import React from 'react';
import styled from 'styled-components';
import ReactDayPicker from 'react-day-picker';

import { cssConstants, shadows } from '_constants';
import { Flex, Text } from '_components';
import { ErrorAlert } from './ErrorAlert';

const DayPickerContainer = styled.div`
  display: flex;
  align-items: center;
  align-content: space-between;
  flex-direction: column;
  border: 1px solid ${cssConstants.PRIMARY_BLUE};
  border-left: none;
  background: ${cssConstants.PRIMARY_WHITE};
  opacity: 0;
  visibility: hidden;
  transition: all 0.1s ease-in-out;

  ${(props) =>
    props.show &&
    `
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
    box-shadow: ${shadows.SMALL};
    border-radius: 0 4px 4px 0;
  `};
`;
DayPickerContainer.displayName = 'DropdownMenu';

export const DayPicker = ({
  dateRangePickerOpen,
  from,
  to,
  fromIsOpen,
  toIsOpen,
  fromError,
  toError,
  handleFromChange,
  handleToChange,
  modifiers,
  disabledDays,
}) => {
  const generateDisabledStartDates = () => {
    return {
      ...disabledDays,
    };
  };

  const generateDisabledEndDates = () => {
    return {
      ...disabledDays,
      before: from,
    };
  };

  return (
    <DayPickerContainer show={dateRangePickerOpen}>
      {fromIsOpen && (
        <>
          <Flex height="40px" width="100%">
            {fromError ? (
              <ErrorAlert msg="Start Date Required" />
            ) : (
              <Text
                color={cssConstants.PRIMARY_GRAY}
                margin="20px"
                size={12}
                height="20px"
              >
                Start Date
              </Text>
            )}
          </Flex>
          <ReactDayPicker
            month={from}
            disabledDays={generateDisabledStartDates()}
            modifiers={modifiers}
            onDayClick={handleFromChange}
            selectedDays={[from, { from, to }]}
          />
        </>
      )}

      {toIsOpen && (
        <>
          <Flex height="40px" width="100%">
            {toError ? (
              <ErrorAlert msg="End Date Required" />
            ) : (
              <Text
                color={cssConstants.PRIMARY_GRAY}
                margin="20px"
                size={12}
                height="20px"
              >
                End Date
              </Text>
            )}
          </Flex>
          <ReactDayPicker
            month={from}
            disabledDays={generateDisabledEndDates()}
            modifiers={modifiers}
            onDayClick={handleToChange}
            selectedDays={[from, { from, to }]}
          />
        </>
      )}
    </DayPickerContainer>
  );
};
