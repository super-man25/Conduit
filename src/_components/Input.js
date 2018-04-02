import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const Input = styled.input`
  display: block;
  margin-top: 10px;
  margin-bottom : 25px;
  background: ${props => (props.disabled ? cssConstants.PRIMARY_LIGHT_GRAY : cssConstants.PRIMARY_WHITE)};
  &:-webkit-autofill {
    -webkit-box-shadow: inset 0 0 0px 9999px white;
  }
  font-size: 0.8em;
  font-weight: 200;
  width: 96%;
  padding-left: 3%;
  border: 2px solid;
  border-radius: 3px;
  border-color: ${props => (props.valid ? cssConstants.SECONDARY_GREEN : props.inValid ? cssConstants.SECONDARY_RED : cssConstants.PRIMARY_DARK_GRAY)};
  padding-top: 0.9em;
  padding-bottom: 0.9em;
`;