// @flow

import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { cssConstants } from '_constants';
import okIcon from '_images/valid.png';
import badIcon from '_images/invalid.png';

const OK = `url(${okIcon})`;
const BAD = `url(${badIcon})`;

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

type Props = {
  disabled?: boolean,
  valid?: boolean,
  inValid?: boolean
};

export const Input: React.ComponentType<Props> = styled.input.attrs({
  bordercolor: (props) =>
    (props.valid && cssConstants.SECONDARY_GREEN) ||
    (props.inValid && cssConstants.SECONDARY_RED) ||
    cssConstants.PRIMARY_DARK_GRAY
})`
  box-sizing: border-box;
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
  background: ${(props) =>
    props.disabled
      ? cssConstants.PRIMARY_LIGHT_GRAY
      : cssConstants.PRIMARY_WHITE};
  background-image: ${(props) =>
    props.valid ? OK : props.inValid ? BAD : 'none'};
  background-repeat: no-repeat;
  background-position: right center;
  &:-webkit-autofill,
  -webkit-autofill:hover,
  -webkit-autofill:focus {
    -webkit-animation-name: ${(props) =>
      props.valid
        ? autofillOK(true)
        : props.inValid
        ? autofillOK(false)
        : 'none'};
    -webkit-animation-fill-mode: both;
  }
  font-size: 1rem;
  width: 100%;
  padding-left: 3%;
  border: 2px solid;
  border-radius: 3px;
  border-color: ${(props) => props.bordercolor};
  padding-top: 0.9em;
  padding-bottom: 0.9em;

  ::placeholder {
    color: ${cssConstants.PRIMARY_GRAY};
  }
`;

type NumberInputProps = {
  component: React.ComponentType<{}>
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
    const isPlusKey = e.keyCode === 61 || 187;
    const isMinusKey = e.keyCode === 173 || 189;

    // Allow: allowedKeycodes, Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, home, end, left, right
    if (
      allowedKeyCodes.indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && isCtrlOrMetaKey) ||
      (e.keyCode === 67 && isCtrlOrMetaKey) ||
      (e.keyCode === 86 && isCtrlOrMetaKey) ||
      (e.keyCode === 88 && isCtrlOrMetaKey) ||
      (e.keyCode >= 35 && e.keyCode <= 39) ||
      (isPlusKey || isMinusKey)
    ) {
      return;
    }
    // Prevent default if it is not a number (stops keypress event)
    if (
      (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  render() {
    const { component, ...props } = this.props;

    let InputComponent = component;
    return <InputComponent onKeyDown={this.onKeyDown} {...props} />;
  }
}
