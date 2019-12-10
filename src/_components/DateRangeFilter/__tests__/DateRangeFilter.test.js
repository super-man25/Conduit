import React from 'react';
import { shallow } from 'enzyme';
import { DateRangeFilter } from '_components/DateRangeFilter';
import { initialState, reducer } from '_components/DateRangeFilter';

const defaultProps = {
  dateRange: { from: null, to: null },
  setDateRange: jest.fn(),
  disabledDays: { after: null, before: null }
};

describe('reducer tests', () => {
  it('should set selected', () => {
    const payload = { title: 'someTitle', key: 0 };
    const action = { type: 'setSelected', payload };
    const result = reducer(initialState, action);
    expect(result.selected).toBe(payload);
  });

  it('should toggle dropdown', () => {
    const action = { type: 'toggleDropdown' };
    const newState = reducer(initialState, action);
    expect(newState.isOpen).toBeTruthy();

    const finalState = reducer(newState, action);
    expect(finalState.isOpen).toBeFalsy();
  });

  it('should open fromInput', () => {
    const action = { type: 'openFromInput' };
    const result = reducer(initialState, action);
    expect(result.isOpen).toBeTruthy();
    expect(result.dateRangePickerOpen).toBeTruthy();
    expect(result.fromIsOpen).toBeTruthy();
    expect(result.toIsOpen).toBeFalsy();
  });

  it('should open toInput', () => {
    const action = { type: 'openToInput' };
    const result = reducer(initialState, action);
    expect(result.isOpen).toBeTruthy();
    expect(result.dateRangePickerOpen).toBeTruthy();
    expect(result.toIsOpen).toBeTruthy();
    expect(result.fromIsOpen).toBeFalsy();
  });

  it('should close all open screens', () => {
    const action = { type: 'closeAll' };
    const result = reducer(
      {
        ...initialState,
        isOpen: true,
        dateRangePickerOpen: true,
        fromIsOpen: true,
        toIsOpen: true
      },
      action
    );
    expect(result.isOpen).toBeFalsy();
    expect(result.dateRangePickerOpen).toBeFalsy();
    expect(result.toIsOpen).toBeFalsy();
    expect(result.fromIsOpen).toBeFalsy();
  });

  it('should close dateRangePicker', () => {
    const action = { type: 'closeDatePicker' };
    const result = reducer(
      {
        ...initialState,
        isOpen: true,
        dateRangePickerOpen: true,
        fromIsOpen: true,
        toIsOpen: true
      },
      action
    );
    expect(result.isOpen).toBeTruthy();
    expect(result.dateRangePickerOpen).toBeFalsy();
    expect(result.toIsOpen).toBeFalsy();
    expect(result.fromIsOpen).toBeFalsy();
  });

  it('should handle toClickAwayError', () => {
    const action = { type: 'toClickAwayError' };
    const result = reducer(initialState, action);
    expect(result.isOpen).toBeTruthy();
    expect(result.dateRangePickerOpen).toBeTruthy();
    expect(result.toIsOpen).toBeTruthy();
    expect(result.toError).toBeTruthy();
    expect(result.fromIsOpen).toBeFalsy();
  });

  it('should handle fromClickAwayError', () => {
    const action = { type: 'fromClickAwayError' };
    const result = reducer(initialState, action);
    expect(result.isOpen).toBeTruthy();
    expect(result.dateRangePickerOpen).toBeTruthy();
    expect(result.fromIsOpen).toBeTruthy();
    expect(result.fromError).toBeTruthy();
    expect(result.toIsOpen).toBeFalsy();
  });

  it('should reset errors', () => {
    const action = { type: 'resetError' };
    const result = reducer(
      { ...initialState, toError: true, fromError: true },
      action
    );
    expect(result.fromError).toBeFalsy();
    expect(result.toError).toBeFalsy();
  });
});
