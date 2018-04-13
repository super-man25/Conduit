import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const H1 = styled.h1`
  display: block;
  float: ${(props) => {
    if (props.floatLeft) {
      return 'left';
    } else if (props.floatRight) {
      return 'right';
    } return 'none';
  }};
  color: ${(props) => { return !props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK; }};
  font-size: ${(props) => { return !props.size ? props.size : cssConstants.TITLE_SIZE_H1; }};
  font-weight: ${(props) => { return !props.weight ? props.weight : cssConstants.TITLE_WEIGHT_H1; }};
`;

export const H2 = styled.h2`
  display: block;
  float: ${(props) => {
    if (props.floatLeft) {
      return 'left';
    } else if (props.floatRight) {
      return 'right';
    } return 'none';
  }};
  color: ${(props) => { return props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK; }};
  font-size: ${(props) => { return props.size ? props.size : cssConstants.TITLE_SIZE_H2; }};
  font-weight: ${(props) => { return props.weight ? props.weight : cssConstants.TITLE_WEIGHT_H2; }};
`;

export const H3 = styled.h3`
  display: block;
  float: ${(props) => {
    if (props.floatLeft) {
      return 'left';
    } else if (props.floatRight) {
      return 'right';
    } return 'none';
  }}; 
  color: ${(props) => {
    if (props.login) {
      return cssConstants.PRIMARY_DARK_BLUE;
    } else if (props.screenTitle) {
      return cssConstants.PRIMARY_LIGHT_BLUE;
    } else if (props.color) {
      return props.color;
    } return cssConstants.PRIMARY_LIGHT_BLACK;
  }};
  font-size: ${(props) => { return props.size ? props.size : cssConstants.TITLE_SIZE_H3; }};
  font-weight: ${(props) => {
    if (props.login) {
      return 'bold';
    } else if (props.weight) {
      return props.weight;
    } return cssConstants.TITLE_WEIGHT_H3;
  }};
`;

export const H4 = styled.h4`
  display: block;
  float: ${(props) => {
    if (props.floatLeft) {
      return 'left';
    } else if (props.floatRight) {
      return 'right';
    } return 'none';
  }};
  color: ${(props) => { return props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK; }};
  font-size: ${(props) => { return props.size ? props.size : cssConstants.TITLE_SIZE_H4; }};
  font-weight: ${(props) => { return props.weight ? props.weight : cssConstants.TITLE_WEIGHT_H4; }};
`;

export const H5 = styled.h5`
    display: block;
  clear: ${(props) => {
    if (props.clearLeft) {
      return 'left';
    } else if (props.clearRight) {
      return 'right';
    } return 'none';
  }};
  float: ${(props) => {
    if (props.floatLeft) {
      return 'left';
    } else if (props.floatRight) {
      return 'right';
    } return 'none';
  }};
  color: ${(props) => { return props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK; }};
  font-size: ${(props) => { return props.size ? props.size : cssConstants.TITLE_SIZE_H5; }};
  font-weight: ${(props) => { return props.weight ? props.weight : cssConstants.TITLE_WEIGHT_H5; }};
`;

export const P1 = styled.p`
  display: block;
  color: ${(props) => { return props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK; }};
  font-size: ${(props) => { return props.size ? props.size : cssConstants.PARAGRAPH_SIZE_P1; }};
  font-weight: ${(props) => { return props.weight ? props.weight : cssConstants.PARAGRAPH_WEIGHT_P1; }};
`;

export const P2 = styled.p`
  display: block;
  color: ${(props) => { return props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK; }};
  font-size: ${(props) => { return props.size ? props.size : cssConstants.PARAGRAPH_SIZE_P2; }};
  font-weight: ${(props) => { return props.weight ? props.weight : cssConstants.PARAGRAPH_WEIGHT_P2; }};
`;

export const S1 = styled.span`
  display: block;
  color: ${(props) => { return props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK; }};
  font-size: ${(props) => { return props.size ? props.size : cssConstants.SUBHEADING_SIZE_S1; }};
  font-weight: ${(props) => { return props.weight ? props.weight : cssConstants.SUBHEADING_WEIGHT_S1; }};
`;

export const Label = styled.label`
  display: ${(props) => { return props.inline ? 'inline-block' : 'block'; }};
  color: ${(props) => { return props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK; }};
  font-size: ${(props) => { return props.size ? props.size : cssConstants.LABEL_SIZE; }};
  font-weight: ${(props) => { return props.weight ? props.weight : cssConstants.LABEL_WEIGHT; }};
`;

