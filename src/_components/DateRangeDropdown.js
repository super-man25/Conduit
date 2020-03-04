// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import DayPicker from 'react-day-picker';
import { format, isSameDay, startOfDay, endOfDay } from 'date-fns';
import 'react-day-picker/lib/style.css';

import { withClickAway } from '_hoc';
import { Icon } from '_components';
import { colors } from '_constants';
import { fadeIn } from './keyframes';

const DateRangeInput: React.ComponentType<{ active: boolean }> = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  text-align: left;
  border: 1px solid ${colors.gray};

  ${(props) =>
    props.active &&
    css`
      border: 1px solid ${colors.blue} !important;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}

  & + ${() => DateRangeInput} {
    ${(props) =>
      props.active &&
      css`
        border-left: none;
      `}
  }
`;

const DateRangeDropdownContainer: React.ComponentType<{}> = styled.div`
  display: inline-flex;
  cursor: pointer;
  text-align: left;
  font-size: 14px;

  ${/* sc-selector */ DateRangeInput}:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border-right: none;
  }
  ${/* sc-selector */ DateRangeInput}:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;

const ClickAwayDropdownContainer = withClickAway(DateRangeDropdownContainer);

const DateRangeLabel: React.ComponentType<{}> = styled.span`
  color: ${colors.gray};
  font-size: 12px;
  position: absolute;
  top: 8px;
  left: 1.5rem;
`;

const DropdownSelectedItem: React.ComponentType<{
  dropdownOpen: boolean,
}> = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  border-bottom: 1px solid
    ${(props) => (props.dropdownOpen ? colors.gray : 'transparent')};
`;

const DropdownIconWrapper: React.ComponentType<{}> = styled.span`
  transition: transform ease-out 0.2s;
  transform: ${(props) => (props.active ? 'rotate(180deg)' : 'rotate(0)')};
`;

const DropdownMenu: React.ComponentType<{}> = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: -1px;
  min-width: 100%;
  border: 1px solid ${colors.blue};
  z-index: 10;
  background-color: ${colors.white};
  opacity: 0;

  animation: ${fadeIn} 0.2s ease-out;
  animation-fill-mode: forwards;
`;

DateRangeInput.displayName = 'DateRangeInput';
DateRangeDropdownContainer.displayName = 'DateRangeDropdownContainer';
DropdownSelectedItem.displayName = 'DropdownSelectedItem';
DropdownIconWrapper.displayName = 'DropdownIconWrapper';
DropdownMenu.displayName = 'DropdownMenu';

type Props = {
  to: Date,
  from: Date,
  onChange: ({ from: ?Date, to: ?Date }) => void,
  disabledDays: { after: Date, before: Date },
  startPlaceholder: string,
  endPlaceholder: string,
  dateDisplayFormat: string,
};

type State = {
  fromIsOpen: boolean,
  toIsOpen: boolean,
};

export class DateRangeDropdown extends React.Component<Props, State> {
  state = {
    fromIsOpen: false,
    toIsOpen: false,
  };

  static defaultProps = {
    onChange: () => {},
    dateDisplayFormat: 'MM/dd/yyyy',
  };

  handleClickaway = () => {
    this.setState({
      fromIsOpen: false,
      toIsOpen: false,
    });
  };

  generateDisabledStartDates() {
    const { to, disabledDays } = this.props;

    return {
      ...disabledDays,
      after: to,
    };
  }

  generateDisabledEndDates() {
    const { from, disabledDays } = this.props;

    return {
      ...disabledDays,
      before: from,
    };
  }

  handleFromChange = (fromDay: Date, modifiers: { disabled: boolean }) => {
    const { onChange, to, from } = this.props;

    if (modifiers.disabled) {
      return;
    }

    if (isSameDay(fromDay, from)) {
      onChange({ from: null, to: endOfDay(to) });
    } else {
      onChange({ from: startOfDay(fromDay), to: endOfDay(to) });
    }
  };

  handleToChange = (toDay: Date, modifiers: { disabled: boolean }) => {
    const { onChange, from, to } = this.props;

    if (modifiers.disabled) {
      return;
    }

    if (isSameDay(toDay, to)) {
      onChange({ from: startOfDay(from), to: null });
    } else {
      onChange({ from: startOfDay(from), to: endOfDay(toDay) });
    }
  };

  openFromInput = () => {
    this.setState({ fromIsOpen: true, toIsOpen: false });
  };

  openToInput = () => {
    this.setState({ fromIsOpen: false, toIsOpen: true });
  };

  render() {
    const {
      startPlaceholder,
      endPlaceholder,
      dateDisplayFormat,
      from,
      to,
    } = this.props;

    const { fromIsOpen, toIsOpen } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <ClickAwayDropdownContainer onClickAway={this.handleClickaway}>
        <DateRangeInput onClick={this.openFromInput} active={fromIsOpen}>
          <DropdownSelectedItem dropdownOpen={fromIsOpen}>
            <span>
              {from ? format(from, dateDisplayFormat) : startPlaceholder}
            </span>
            <DropdownIconWrapper active={fromIsOpen}>
              <Icon size={24} name="arrowDown" />
            </DropdownIconWrapper>
          </DropdownSelectedItem>
          {fromIsOpen && (
            <DropdownMenu>
              <DateRangeLabel>Start Date</DateRangeLabel>
              <DayPicker
                disabledDays={this.generateDisabledStartDates()}
                initialMonth={from || undefined}
                onDayClick={this.handleFromChange}
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
              />
            </DropdownMenu>
          )}
        </DateRangeInput>

        <DateRangeInput onClick={this.openToInput} active={toIsOpen}>
          <DropdownSelectedItem dropdownOpen={toIsOpen}>
            <span>{to ? format(to, dateDisplayFormat) : endPlaceholder}</span>
            <DropdownIconWrapper active={toIsOpen}>
              <Icon size={24} name="arrowDown" />
            </DropdownIconWrapper>
          </DropdownSelectedItem>
          {toIsOpen && (
            <DropdownMenu>
              <DateRangeLabel>End Date</DateRangeLabel>
              <DayPicker
                initialMonth={to || undefined}
                disabledDays={this.generateDisabledEndDates()}
                onDayClick={this.handleToChange}
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
              />
            </DropdownMenu>
          )}
        </DateRangeInput>
      </ClickAwayDropdownContainer>
    );
  }
}
