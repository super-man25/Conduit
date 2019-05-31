// @flow
import React, { Fragment, useReducer } from 'react';
import { Flex, Icon, Text } from '_components';
import { cssConstants } from '_constants';
import {
  format,
  startOfDay,
  endOfDay,
  startOfYesterday,
  endOfYesterday,
  subWeeks,
  startOfMonth,
  subMonths,
  endOfMonth,
  startOfYear
} from 'date-fns';
import DayPicker from 'react-day-picker';
import { filterOptions } from './constants';
import { Option } from './Option';
import { DropdownContainer } from './DropdownContainer';
import { Dropdown } from './Dropdown';
import { DropdownMenu } from './DropdownMenu';
import { DayPickerContainer } from './DayPickerContainer';
import { ErrorAlert } from './ErrorAlert';

type DropdownOption = {
  title: string,
  key: number
};

type ActionType =
  | 'setSelected'
  | 'toggleDropdown'
  | 'openFromInput'
  | 'openToInput'
  | 'closeAll'
  | 'closeDatePicker'
  | 'toClickAwayError'
  | 'fromClickAwayError'
  | 'resetError';

type Action = {
  type: ActionType,
  payload?: DropdownOption
};

type Props = {
  dateRange: { from: ?Date, to: ?Date },
  setDateRange: ({ from: ?Date, to: ?Date }) => void,
  disabledDays: { after: ?Date, before: ?Date },
  allTimeDateRange: { from: ?Date, to: ?Date },
  arrowColor?: string
};

type State = {
  selected: ?DropdownOption,
  dateRangePickerOpen: boolean,
  isOpen: boolean,
  fromIsOpen: boolean,
  toIsOpen: boolean,
  toError: boolean,
  fromError: boolean
};

export const initialState: State = {
  selected: null,
  dateRangePickerOpen: false,
  isOpen: false,
  fromIsOpen: false,
  toIsOpen: false,
  toError: false,
  fromError: false
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setSelected':
      return { ...state, selected: action.payload };
    case 'toggleDropdown':
      return { ...state, isOpen: !state.isOpen };
    case 'openFromInput':
      return {
        ...state,
        isOpen: true,
        dateRangePickerOpen: true,
        fromIsOpen: true,
        toIsOpen: false
      };
    case 'openToInput':
      return {
        ...state,
        isOpen: true,
        dateRangePickerOpen: true,
        fromIsOpen: false,
        toIsOpen: true
      };
    case 'closeAll':
      return {
        ...state,
        isOpen: false,
        dateRangePickerOpen: false,
        fromIsOpen: false,
        toIsOpen: false
      };
    case 'closeDatePicker':
      return {
        ...state,
        dateRangePickerOpen: false,
        fromIsOpen: false,
        toIsOpen: false
      };
    case 'toClickAwayError':
      return {
        ...state,
        isOpen: true,
        dateRangePickerOpen: true,
        toIsOpen: true,
        fromIsOpen: false,
        toError: true
      };
    case 'fromClickAwayError':
      return {
        ...state,
        isOpen: true,
        dateRangePickerOpen: true,
        fromIsOpen: true,
        toIsOpen: false,
        fromError: true
      };
    case 'resetError':
      return { ...state, toError: false, fromError: false };
    default:
      throw new Error();
  }
};

export const DateRangeFilter = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const parseOption = (option: ?DropdownOption) => {
    return option ? option.title : 'Select Filter';
  };

  const onFilterChange = (option: DropdownOption) => {
    const { setDateRange, allTimeDateRange } = props;
    let from = null;
    let to = null;
    switch (option.title) {
      case 'Today':
        to = endOfDay(new Date());
        from = startOfDay(new Date());
        setDateRange({ from, to });
        break;
      case 'Yesterday':
        to = endOfYesterday(new Date());
        from = startOfYesterday(new Date());
        setDateRange({ from, to });
        break;
      case 'Last 7 Days':
        to = endOfDay(new Date());
        from = subWeeks(to, 1);
        setDateRange({ from, to });
        break;
      case 'Month to Date':
        to = endOfDay(new Date());
        from = startOfMonth(new Date());
        setDateRange({ from, to });
        break;
      case 'Previous Month':
        to = endOfMonth(subMonths(new Date(), 1));
        from = startOfMonth(subMonths(new Date(), 1));
        setDateRange({ from, to });
        break;
      case 'Year to Date':
        to = endOfDay(new Date());
        from = startOfYear(new Date());
        setDateRange({ from, to });
        break;
      case 'All Time':
        to = endOfDay(allTimeDateRange.to);
        from = startOfDay(allTimeDateRange.from);
        setDateRange({ from, to });
        break;
      case 'Select Date Range':
        dispatch({ type: 'openFromInput' });
        break;
      default:
        break;
    }
    dispatch({ type: 'setSelected', payload: option });
  };

  const toggleDropdownOpen = () => {
    const { selected } = state;

    const showDatePicker =
      selected && selected.title === 'Select Date Range' ? true : false;

    if (showDatePicker) {
      dispatch({ type: 'openFromInput' });
    } else {
      dispatch({ type: 'closeDatePicker' });
      dispatch({ type: 'toggleDropdown' });
    }
  };

  const itemClicked = (newSelected: DropdownOption) => {
    const { selected: prevSelected } = state;

    if (prevSelected === newSelected) {
      return;
    }

    if (newSelected.title !== 'Select Date Range') {
      dispatch({ type: 'closeDatePicker' });
      dispatch({ type: 'toggleDropdown' });
    }
    onFilterChange(newSelected);
  };

  const displayDropdownText = (
    selected: ?DropdownOption,
    start: ?Date,
    end: ?Date
  ) => {
    const selectedItem = filterOptions.find((option) => option === selected);
    if (!selectedItem) return parseOption(filterOptions[0]);
    if (selectedItem && selectedItem.title === 'Select Date Range') {
      return displayDateRangeOption(start, end);
    } else {
      return parseOption(selected);
    }
  };

  const displayDateRangeOption = (from: ?Date, to: ?Date) => {
    const pattern = 'MMM DD[,] YYYY';
    return (
      <Flex>
        <Text
          color={
            !!from
              ? cssConstants.PRIMARY_LIGHT_BLACK
              : cssConstants.PRIMARY_LIGHT_GRAY
          }
          cursor="pointer"
        >
          {!!from ? format(from, pattern) : 'select date'}
        </Text>
        <Text marginLeft="15px" marginRight="15px">
          to
        </Text>
        <Text
          color={
            !!to
              ? cssConstants.PRIMARY_LIGHT_BLACK
              : cssConstants.PRIMARY_LIGHT_GRAY
          }
          cursor="pointer"
        >
          {!!to ? format(to, pattern) : 'select date'}
        </Text>
      </Flex>
    );
  };

  const handleFromChange = (
    fromDay: Date,
    modifiers: { disabled: boolean }
  ) => {
    const { setDateRange } = props;

    if (modifiers.disabled) {
      return;
    }

    setDateRange({ from: startOfDay(fromDay), to: null });
    dispatch({ type: 'resetError' });
    dispatch({ type: 'openToInput' });
  };

  const handleToChange = (toDay: Date, modifiers: { disabled: boolean }) => {
    const {
      setDateRange,
      dateRange: { from }
    } = props;

    if (modifiers.disabled) {
      return;
    }

    setDateRange({ from: startOfDay(from), to: endOfDay(toDay) });
    dispatch({ type: 'resetError' });
    dispatch({ type: 'closeAll' });
  };

  const generateDisabledStartDates = () => {
    const { disabledDays } = props;
    return {
      ...disabledDays
    };
  };

  const generateDisabledEndDates = () => {
    const { disabledDays } = props;
    const {
      dateRange: { from }
    } = props;
    return {
      ...disabledDays,
      before: from
    };
  };

  const clickAway = () => {
    const {
      dateRange: { from, to }
    } = props;
    if (!!from && !!to) {
      dispatch({ type: 'closeAll' });
      dispatch({ type: 'resetError' });
    } else if (!from) {
      dispatch({ type: 'fromClickAwayError' });
    } else {
      dispatch({ type: 'toClickAwayError' });
    }
  };

  const {
    arrowColor,
    dateRange: { from, to }
  } = props;
  const {
    selected,
    dateRangePickerOpen,
    isOpen,
    fromIsOpen,
    toIsOpen,
    fromError,
    toError
  } = state;
  const modifiers = { from, to };

  return (
    <DropdownContainer onClickAway={clickAway}>
      <Dropdown onClick={toggleDropdownOpen} isOpen={isOpen}>
        {displayDropdownText(selected, from, to)}
        <Icon
          size={24}
          color={arrowColor ? arrowColor : cssConstants.PRIMARY_DARK_BLUE}
          name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
        />
      </Dropdown>
      <DropdownMenu show={isOpen}>
        <Flex width="180px">
          <Flex height="354px" flex={1} direction="column">
            {filterOptions.map((option, idx) => (
              <Option
                isActive={option === selected}
                key={idx}
                onClick={() => itemClicked(option)}
                dateRangePickerOpen={dateRangePickerOpen}
              >
                <Flex justify="space-between" height="20px">
                  {parseOption(option)}
                  {option === selected && (
                    <Icon
                      size={20}
                      name="check"
                      color={cssConstants.PRIMARY_BLUE}
                    />
                  )}
                </Flex>
              </Option>
            ))}
          </Flex>
          <Flex height="354px" flex={1}>
            <DayPickerContainer show={dateRangePickerOpen}>
              {fromIsOpen && (
                <Fragment>
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
                  <DayPicker
                    month={from}
                    disabledDays={generateDisabledStartDates()}
                    modifiers={modifiers}
                    onDayClick={handleFromChange}
                    selectedDays={[from, { from, to }]}
                  />
                </Fragment>
              )}

              {toIsOpen && (
                <Fragment>
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
                  <DayPicker
                    month={from}
                    disabledDays={generateDisabledEndDates()}
                    modifiers={modifiers}
                    onDayClick={handleToChange}
                    selectedDays={[from, { from, to }]}
                  />
                </Fragment>
              )}
            </DayPickerContainer>
          </Flex>
        </Flex>
      </DropdownMenu>
    </DropdownContainer>
  );
};