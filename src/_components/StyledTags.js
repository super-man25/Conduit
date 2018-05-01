import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const H1 = styled.h1`
  display: block;
  float: ${(props) =>
    props.floatLeft ? 'left' : props.floatRight ? 'right' : 'none'};
  color: ${(props) =>
    !props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: ${(props) =>
    !props.size ? props.size : cssConstants.TITLE_SIZE_H1};
  font-weight: ${(props) =>
    !props.weight ? props.weight : cssConstants.TITLE_WEIGHT_H1};
`;

export const H2 = styled.h2`
  display: block;
  float: ${(props) =>
    props.floatLeft ? 'left' : props.floatRight ? 'right' : 'none'};
  color: ${(props) =>
    props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: ${(props) =>
    props.size ? props.size : cssConstants.TITLE_SIZE_H2};
  font-weight: ${(props) =>
    props.weight ? props.weight : cssConstants.TITLE_WEIGHT_H2};
`;

export const H3 = styled.h3`
  display: block;
  float: ${(props) =>
    props.floatLeft ? 'left' : props.floatRight ? 'right' : 'none'};
  color: ${(props) =>
    props.login
      ? cssConstants.PRIMARY_DARK_BLUE
      : props.screenTitle
        ? cssConstants.PRIMARY_LIGHT_BLUE
        : props.color
          ? props.color
          : cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: ${(props) =>
    props.size ? props.size : cssConstants.TITLE_SIZE_H3};
  font-weight: ${(props) =>
    props.login
      ? 'bold'
      : props.weight
        ? props.weight
        : cssConstants.TITLE_WEIGHT_H3};
`;

export const H4 = styled.h4`
  display: block;
  float: ${(props) =>
    props.floatLeft ? 'left' : props.floatRight ? 'right' : 'none'};
  color: ${(props) => props.color || 'inherit'};
  font-size: ${(props) =>
    props.size ? props.size : cssConstants.TITLE_SIZE_H4};
  font-weight: ${(props) =>
    props.weight ? props.weight : cssConstants.TITLE_WEIGHT_H4};
`;

export const H5 = styled.h5`
  display: block;
  clear: ${(props) =>
    props.clearLeft ? 'left' : props.clearRight ? 'right' : 'none'};
  float: ${(props) =>
    props.floatLeft ? 'left' : props.floatRight ? 'right' : 'none'};
  color: ${(props) =>
    props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: ${(props) =>
    props.size ? props.size : cssConstants.TITLE_SIZE_H5};
  font-weight: ${(props) =>
    props.weight ? props.weight : cssConstants.TITLE_WEIGHT_H5};
`;

export const P1 = styled.p`
  margin: 0;
  color: ${(props) => props.color || 'inherit'};
  font-size: ${(props) => props.size || '14px'};
  font-weight: ${(props) => props.weight || 'normal'};
`;

export const P2 = styled.p`
  margin: 0;
  color: ${(props) => props.color || 'inherit'};
  font-size: ${(props) => props.size || '12px'};
  font-weight: ${(props) => props.weight || 'normal'};
`;

export const S1 = styled.span`
  display: block;
  color: ${(props) =>
    props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: ${(props) =>
    props.size ? props.size : cssConstants.SUBHEADING_SIZE_S1};
  font-weight: ${(props) =>
    props.weight ? props.weight : cssConstants.SUBHEADING_WEIGHT_S1};
`;

export const Label = styled.label`
  display: ${(props) => (props.inline ? 'inline-block' : 'block')};
  color: ${(props) =>
    props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: ${(props) => (props.size ? props.size : cssConstants.LABEL_SIZE)};
  font-weight: ${(props) =>
    props.weight ? props.weight : cssConstants.LABEL_WEIGHT};
`;
