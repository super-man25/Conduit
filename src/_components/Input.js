// @flow

import * as React from 'react';
import styled, { keyframes } from 'styled-components';

import { cssConstants } from '_constants';
import okIcon from '_images/valid.png';
import badIcon from '_images/invalid.png';
import { Label } from './StyledTags';

export const InputBase = styled.input.attrs((props) => ({
  autoComplete: props.autoComplete || 'off',
}))`
  position: relative;
  padding: 15px;
  font-size: 14px;
  border: 2px solid ${cssConstants.PRIMARY_BLUE};
  border-color: ${({ valid, invalid }) =>
    valid
      ? cssConstants.SECONDARY_GREEN
      : invalid
      ? cssConstants.SECONDARY_RED
      : null};
  border-radius: 3px;
  background: ${(props) =>
    props.disabled
      ? cssConstants.PRIMARY_LIGHT_GRAY
      : cssConstants.PRIMARY_WHITE};
  ::placeholder {
    color: ${cssConstants.PRIMARY_GRAY};
  }
`;

export const InputLabel = styled(Label)`
  margin-bottom: 10px;
`;

function autofillOK(valid) {
  const status = keyframes`
    to {
      color: #666;
      background: white;
      background-image: ${valid ? `url(${okIcon})` : `url(${badIcon})`};
      background-repeat: no-repeat;
      background-position: right center;
    }
  `;
  return status;
}

type InputProps = {
  disabled?: boolean,
  valid?: boolean,
  invalid?: boolean,
};

export const Input: React.ComponentType<InputProps> = styled(InputBase)`
  display: block;
  background: ${(props) =>
    props.disabled
      ? cssConstants.PRIMARY_LIGHT_GRAY
      : cssConstants.PRIMARY_WHITE};
  background-image: ${(props) =>
    props.valid
      ? `url(${okIcon})`
      : props.invalid
      ? `url(${badIcon})`
      : 'none'};
  background-repeat: no-repeat;
  background-position: right center;
  &:-webkit-autofill {
    animation-name: ${(props) =>
      props.valid
        ? autofillOK(true)
        : props.invalid
        ? autofillOK(false)
        : 'none'};
    animation-fill-mode: both;
  }
  width: ${(props) => (props.width ? props.width : '100%')};
`;

type NumberInputProps = {
  component: React.ComponentType<{}>,
};

// delete, backspace, tab, escape, enter, decimal, period
const allowedKeyCodes = [46, 8, 9, 27, 13, 110, 190];

/**
 * NumberInputField component wraps an input with a keydown event handler.
 * The event handler will only allow numbers and some other special chars
 * to be entered.
 */
export class NumberInputField extends React.Component<NumberInputProps> {
  onKeyDown = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const isCtrlOrMetaKey = e.ctrlKey || e.metaKey;
    // Cross browser support for + and -
    const isPlusKey = [61, 187].includes(e.keyCode);
    const isMinusKey = [173, 189].includes(e.keyCode);

    // Allow: allowedKeycodes, Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, home, end, left, right
    if (
      allowedKeyCodes.includes(e.keyCode) ||
      (e.keyCode === 65 && isCtrlOrMetaKey) ||
      (e.keyCode === 67 && isCtrlOrMetaKey) ||
      (e.keyCode === 86 && isCtrlOrMetaKey) ||
      (e.keyCode === 88 && isCtrlOrMetaKey) ||
      (e.keyCode >= 35 && e.keyCode <= 39) ||
      isPlusKey ||
      isMinusKey
    ) {
      return;
    }
    // Prevent default if it is not a number (stops keypress event)
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  render() {
    const { component, ...props }: any = this.props;

    let InputComponent = component;
    return <InputComponent onKeyDown={this.onKeyDown} {...props} />;
  }
}
