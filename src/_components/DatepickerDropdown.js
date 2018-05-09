import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/lib/style.css';

import { withClickAway } from '_hoc';
import { cssConstants } from '_constants';
import { fadeIn } from './keyframes';
import { Icon } from '_components';

const DropdownContainer = withClickAway(styled.div`
  display: inline-block;
  position: relative;
  min-width: 100px;
  cursor: pointer;
  text-align: left;
  border: 1px solid
    ${(props) =>
      props.active
        ? cssConstants.PRIMARY_LIGHT_BLUE
        : cssConstants.PRIMARY_GRAY};
  border-radius: 3px;
  font-size: 14px;
`);

const DropdownSelectedItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  border-bottom: 1px solid
    ${(props) =>
      props.dropdownOpen ? cssConstants.PRIMARY_LIGHT_GRAY : 'transparent'};
`;

const DropdownIconWrapper = styled.span`
  transition: transform ease-out 0.2s;
  transform: ${(props) => (props.active ? 'rotate(180deg)' : 'rotate(0)')};
`;

const DropdownMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  min-width: 100%;
  box-shadow: 0 0 0 1px ${cssConstants.PRIMARY_LIGHT_BLUE};
  border-top: none;
  z-index: 10;
  background-color: ${cssConstants.PRIMARY_WHITE};
  opacity: 0;

  animation: ${fadeIn} 0.2s ease-out;
  animation-fill-mode: forwards;
`;

export class DatepickerDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  onDropdownItemClicked = (value) => {
    const { options } = this.props;

    return options.find((option) => option.value === value);
  };

  getSelectedOption() {
    const { options } = this.props;
    const { selectedOption } = this.state;

    if (!selectedOption) {
      return null;
    }

    return options.find((option) => option.value === selectedOption.value);
  }

  handleClickAway = () => {
    const { isOpen } = this.state;

    if (isOpen) {
      this.setState({ isOpen: false });
    }
  };

  toggleIsOpen = (value) => {
    this.setState({
      isOpen: value
    });
  };

  onDayClicked = (date, modifiers, e) => {
    this.props.onChange(date);
  };

  render() {
    const { placeholder, selectedDate, dateDisplayFormat } = this.props;
    const { isOpen } = this.state;

    return (
      <DropdownContainer
        onClickAway={this.handleClickAway}
        active={isOpen}
        onClick={this.toggleIsOpen}
      >
        <DropdownSelectedItem dropdownOpen={isOpen}>
          <span>
            {selectedDate
              ? format(selectedDate, dateDisplayFormat)
              : placeholder}
          </span>
          <DropdownIconWrapper active={isOpen}>
            <Icon size={24} name="arrow-drop-down" />
          </DropdownIconWrapper>
        </DropdownSelectedItem>
        {isOpen && (
          <DropdownMenu>
            <DayPicker
              onDayClick={this.onDayClicked}
              selectedDays={selectedDate}
            />
          </DropdownMenu>
        )}
      </DropdownContainer>
    );
  }
}

DatepickerDropdown.propTypes = {
  selectedDay: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  dateDisplayFormat: PropTypes.string
};

DatepickerDropdown.defaultProps = {
  onChange: () => {},
  selectedDate: new Date(),
  dateDisplayFormat: 'MM/DD/YYYY'
};
