import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const Button = styled.button`
  display: ${(props) => { return props.hidden ? 'none' : 'block'; }};
  color: ${(props) => {
    if (!props.secondary) {
      return cssConstants.PRIMARY_WHITE;
    } else if (props.disabled) {
      return cssConstants.PRIMARY_WHITE;
    } return cssConstants.PRIMARY_LIGHT_BLUE;
  }}; 
  font-size: ${(props) => { return props.collapse || props.expand ? '16px' : '0.8em'; }};
  font-weight: 200;
  float: ${(props) => {
    if (props.collapse) {
      return 'right';
    } else if (props.expand) {
      return 'left';
    } return 'none';
  }};
  width: ${(props) => { return props.collapse || props.expand ? '30px' : '100%'; }};
  margin: 0;
  margin-top: ${(props) => {
    if (props.collapse) {
      return '20px';
    } else if (props.expand) {
      return '16px';
    } return '10px';
  }};
  margin-bottom : ${(props) => {
    if (props.collapse) {
      return 'auto';
    } else if (props.expand) {
      return 'auto';
    } return '10px';
  }};
  margin-right: ${(props) => { return props.collapse || props.expand ? '20px' : '0';}};
  padding: ${(props) => { return props.collapse || props.expand ? '0.4em' : '0.8em';}};
  padding-top: ${(props) => {
    if (props.collapse || props.expand) {
      return '0.3em';
    } else if (props.small) {
      return '0.6em';
    } return '0.9em';
  }};
  padding-bottom: ${(props) => {
    if (props.collapse || props.expand) {
      return '0.3em';
    } else if (props.small) {
      return '0.55em';
    } return '0.85em';
  }};
  border: 2px solid;
  border-radius: 3px;
  border-color: ${(props) => {
    if (props.disabled) {
      return cssConstants.PRIMARY_LIGHT_GRAY;
    } else if (props.secondary) {
      return cssConstants.PRIMARY_LIGHT_BLUE;
    } return cssConstants.PRIMARY_LIGHT_BLUE;
  }};
  background-color: ${(props) => {
    if (props.disabled) {
      return cssConstants.PRIMARY_LIGHT_GRAY;
    } else if (props.secondary) {
      return cssConstants.PRIMARY_WHITE;
    } return cssConstants.PRIMARY_LIGHT_BLUE;
  }};
  &:hover {
    cursor: ${(props) => { return props.disabled ? 'not-allowed' : 'pointer'; }};
    color: ${(props) => {
    if (props.disabled) {
      return cssConstants.PRIMARY_WHITE;
    } else if (props.secondary) {
      return cssConstants.SECONDARY_BLUE;
    } return cssConstants.PRIMARY_WHITE;
  }};
    background-color: ${(props) => {
    if (props.disabled) {
      return cssConstants.PRIMARY_LIGHT_GRAY;
    } else if (props.secondary) {
      return cssConstants.PRIMARY_WHITE;
    } return cssConstants.SECONDARY_BLUE;
  }};
    border-color: ${(props) => {
    if (props.disabled) {
      return cssConstants.PRIMARY_LIGHT_GRAY;
    } else if (props.secondary) {
      return cssConstants.SECONDARY_BLUE;
    } return cssConstants.SECONDARY_BLUE;
  }};
  }
  ::before {
    content: "${(props) => {
    if (props.collapse) {
      return '<';
    } else if (props.expand) {
      return '>';
    } return '';
  }}";
  }
`;
