import styled from 'styled-components';
import { cssConstants } from '../_constants';
import okIcon from '../_images/valid.png';
import badIcon from '../_images/invalid.png';

const OK = 'url(' + okIcon + ')';
const BAD = 'url(' + badIcon + ')';

export const Input = styled.input`
  display: block;
  margin-top: 10px;
  margin-bottom : 5px;
  background: ${props => (props.disabled ? cssConstants.PRIMARY_LIGHT_GRAY : cssConstants.PRIMARY_WHITE)};
  background-image: ${props => (props.valid ? OK : props.inValid ? BAD : 'none')};
  background-repeat: no-repeat;
  background-position: right center;
  &:-webkit-autofill {
    -webkit-animation-name: autofill;
    -webkit-animation-fill-mode: both;
  }
  font-size: 13.5px;
  font-weight: 200;
  width: 96%;
  padding-left: 3%;
  border: 2px solid;
  border-radius: 3px;
  border-color: ${props => (props.valid ? cssConstants.SECONDARY_GREEN : props.inValid ? cssConstants.SECONDARY_RED : cssConstants.PRIMARY_DARK_GRAY)};
  padding-top: 0.9em;
  padding-bottom: 0.9em;
`;