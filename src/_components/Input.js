import styled, { keyframes } from 'styled-components';
import { cssConstants } from '../_constants';
import okIcon from '../_images/valid.png';
import badIcon from '../_images/invalid.png';

const OK = `url(${ okIcon })`;
const BAD = `url(${ badIcon })`;

function autofillOK(valid) {
  const status = keyframes`
    to {
      color: #666;
      background: white;
      background-image: ${valid ? `url(${ okIcon })` : `url(${ badIcon })` };
      background-repeat: no-repeat;
      background-position: right center;
    }
  `;
  return status;
}

export const Input = styled.input`
  display: block;
  margin-top: 10px;
  margin-bottom : 5px;
  background: ${(props) => { return props.disabled ? cssConstants.PRIMARY_LIGHT_GRAY : cssConstants.PRIMARY_WHITE; }};
  background-image: ${(props) => {
    if (props.valid) {
      return OK;
    } else if (props.inValid) {
      return BAD;
    } return 'none';
  }};
;       
  background-repeat: no-repeat;
  background-position: right center;
  &:-webkit-autofill, -webkit-autofill:hover, -webkit-autofill:focus {
    -webkit-animation-name: ${(props) => {
    if (props.valid) {
      return autofillOK(true);
    } else if (props.inValid) {
      return autofillOK(false);
    } return 'none';
  }};
    -webkit-animation-fill-mode: both;
  }
  font-size: 13.5px;
  font-weight: 200;
  width: 96%;
  padding-left: 3%;
  border: 2px solid;
  border-radius: 3px;
  border-color: ${(props) => {
    if (props.valid) {
      return cssConstants.SECONDARY_GREEN;
    } else if (props.inValid) {
      return cssConstants.SECONDARY_RED;
    } return cssConstants.PRIMARY_DARK_GRAY;
  }};
  padding-top: 0.9em;
  padding-bottom: 0.9em;
`;
