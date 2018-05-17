// @flow
import React from 'react';
import type { ComponentType } from 'react';
import styled, { css } from 'styled-components';
import DayPicker from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/lib/style.css';

import { withClickAway } from '_hoc';
import { Icon } from '_components';
import { cssConstants } from '_constants';
import { fadeIn } from './keyframes';

const DateRangeInput: ComponentType<{ active: boolean }> = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  text-align: left;
  border: 1px solid ${cssConstants.PRIMARY_GRAY};

  ${(props) =>
    props.active &&
    css`
      border: 1px solid ${cssConstants.PRIMARY_LIGHT_BLUE} !important;
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

const DateRangeDropdownContainer: ComponentType<{}> = styled.div`
  display: inline-flex;
  cursor: pointer;
  text-align: left;
  font-size: 14px;

  ${DateRangeInput}:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border-right: none;
  }

  ${DateRangeInput}:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;

const ClickAwayDropdownContainer = withClickAway(DateRangeDropdownContainer);

const DateRangeLabel: ComponentType<{}> = styled.span`
  color: ${cssConstants.PRIMARY_GRAY};
  font-size: 12px;
  position: absolute;
  top: 12px;
  left: 24px;
`;

const DropdownSelectedItem: ComponentType<{
  dropdownOpen: boolean
}> = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  border-bottom: 1px solid
    ${(props) =>
      props.dropdownOpen ? cssConstants.PRIMARY_LIGHT_GRAY : 'transparent'};
`;

const DropdownIconWrapper: ComponentType<{}> = styled.span`
  transition: transform ease-out 0.2s;
  transform: ${(props) => (props.active ? 'rotate(180deg)' : 'rotate(0)')};
`;

const DropdownMenu: ComponentType<{}> = styled.div`
  list-style: none;
  padding: 12px 0 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: -1px;
  min-width: 100%;
  border: 1px solid ${cssConstants.PRIMARY_LIGHT_BLUE};
  z-index: 10;
  background-color: ${cssConstants.PRIMARY_WHITE};
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
  onChange: ({ from: Date, to: Date }) => void,
  disabledDays: { after: Date, before: Date },
  startPlaceholder: string,
  endPlaceholder: string,
  dateDisplayFormat: string
};

type State = {
  fromIsOpen: boolean,
  toIsOpen: boolean
};

export class DateRangeDropdown extends React.Component<Props, State> {
  state = {
    fromIsOpen: false,
    toIsOpen: false
  };

  static defaultProps = {
    onChange: () => {},
    dateDisplayFormat: 'MM/DD/YYYY'
  };

  handleClickaway = () => {
    this.setState({
      fromIsOpen: false,
      toIsOpen: false
    });
  };

  generateDisabledStartDates() {
    const { to, disabledDays } = this.props;

    return {
      ...disabledDays,
      after: to
    };
  }

  generateDisabledEndDates() {
    const { from, disabledDays } = this.props;

    return {
      ...disabledDays,
      before: from
    };
  }

  handleFromChange = (fromDay: Date, modifiers: { disabled: boolean }) => {
    const { onChange, to } = this.props;

    if (modifiers.disabled) {
      return;
    }

    onChange({ from: fromDay, to });
  };

  handleToChange = (toDay: Date, modifiers: { disabled: boolean }) => {
    const { onChange, from } = this.props;

    if (modifiers.disabled) {
      return;
    }

    onChange({ from, to: toDay });
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
      to
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
              <Icon size={24} name="arrow-drop-down" />
            </DropdownIconWrapper>
          </DropdownSelectedItem>
          {fromIsOpen && (
            <DropdownMenu>
              <DateRangeLabel>End Date</DateRangeLabel>
              <DayPicker
                disabledDays={this.generateDisabledStartDates()}
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
              <Icon size={24} name="arrow-drop-down" />
            </DropdownIconWrapper>
          </DropdownSelectedItem>
          {toIsOpen && (
            <DropdownMenu>
              <DateRangeLabel>End Date</DateRangeLabel>
              <DayPicker
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
