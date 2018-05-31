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
`;
