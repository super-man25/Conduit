import styled from 'styled-components';
import { cssConstants } from '../_constants';
/* eslint react/no-confusing-arrow: "off" */

export const SelectBox = styled.select`
  position: relative;
  width: 35%;
  height: 40px;
  &:focus {
    outline: ${(props) => {
      return props.noBg ? '0' : '';
    }};
  }
  border: ${(props) => {
    return props.noBg ? 'none' : '2px solid';
  }};
  border-color: ${(props) => {
    if (props.valid) {
      return cssConstants.SECONDARY_GREEN;
    } else if (props.inValid) {
      return cssConstants.SECONDARY_RED;
    }
    return cssConstants.PRIMARY_DARK_GRAY;
  }};
  border-radius: 3px;
  color: ${(props) => {
    return props.noBg
      ? cssConstants.PRIMARY_LIGHT_BLUE
      : cssConstants.PRIMARY_DARKEST_GRAY;
  }};
  font-size: 15.7px;
  font-family: 'Roboto';
  margin: 0;
  margin-left: ${(props) => {
    return props.noBg ? '-6px' : 0;
  }};
  padding: 0;
  padding-right: 35%;
  background: ${(props) => {
    return props.noBg ? 'transparent' : cssConstants.PRIMARY_WHITE;
  }};
`;
