import styled, { css } from 'styled-components';
import { cssConstants } from '_constants';
import { withBoxModelProps } from '_helpers/style-utils';

const WEIGHTS = new Map()
  .set('lighter', '200')
  .set('light', '300')
  .set('normal', '400')
  .set('heavy', '700');

const ellipsis = (props) =>
  props.ellipsis &&
  css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

export const H1 = withBoxModelProps(styled.h1`
  color: ${(props) =>
    !props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: ${(props) =>
    !props.size ? props.size : cssConstants.TITLE_SIZE_H1};
  font-weight: ${(props) =>
    !props.weight ? props.weight : cssConstants.TITLE_WEIGHT_H1};
`);

export const H2 = styled.h2`
  color: ${(props) =>
    props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: ${(props) =>
    props.size ? props.size : cssConstants.TITLE_SIZE_H2};
  font-weight: ${(props) =>
    props.weight ? props.weight : cssConstants.TITLE_WEIGHT_H2};
`;

export const H3 = styled.h3.attrs((props) => ({
  color:
    (props.type === 'secondary' && cssConstants.SECONDARY_BLUE) ||
    (props.type === 'tertiary' && cssConstants.PRIMARY_LIGHT_BLACK) ||
    cssConstants.PRIMARY_BLUE
}))`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size || cssConstants.TITLE_SIZE_H3};
  font-weight: ${(props) =>
    WEIGHTS.get(props.weight) || cssConstants.TITLE_WEIGHT_H3};
`;

export const H4 = withBoxModelProps(
  styled.h4.attrs((props) => ({
    color:
      (props.type === 'secondary' && cssConstants.PRIMARY_GRAY) ||
      cssConstants.PRIMARY_LIGHT_BLACK
  }))`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size || cssConstants.TITLE_SIZE_H4};
    font-weight: ${(props) => props.weight || cssConstants.TITLE_WEIGHT_H4};
  `
);

export const H5 = styled.h5.attrs((props) => ({
  color:
    (props.type === 'secondary' && cssConstants.PRIMARY_GRAY) ||
    cssConstants.PRIMARY_LIGHT_BLACK
}))`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size || cssConstants.TITLE_SIZE_H5};
  font-weight: ${(props) => props.weight || cssConstants.TITLE_WEIGHT_H5};
`;

export const P1 = styled.p.attrs((props) => ({
  size: props.size === 'small' ? '0.875rem' : props.size
}))`
  margin: 0;
  color: ${(props) => props.color || cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: ${(props) => props.size || '1rem'};
  font-weight: ${(props) => props.weight || 'normal'};
`;

export const S1 = styled.span`
  color: ${(props) => props.color || cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: ${(props) => props.size || cssConstants.SUBHEADING_SIZE_S1};
  font-weight: ${(props) => props.weight || cssConstants.SUBHEADING_WEIGHT_S1};

  ${ellipsis};
`;

export const Label = styled.label`
  display: ${(props) => (props.inline ? 'inline-block' : 'block')};
  color: ${(props) =>
    props.color ? props.color : cssConstants.PRIMARY_LIGHT_BLACK};
  font-size: ${(props) => props.size || cssConstants.LABEL_SIZE};
  font-weight: ${(props) => props.weight || cssConstants.LABEL_WEIGHT};
`;

export const HR = styled.hr`
  width: 100%;
  opacity: 0.5;
  margin: ${(props) => props.margin || '2rem 0'};
  color: ${(props) => props.color || cssConstants.PRIMARY_LIGHTEST_GRAY};
`;

export const Box = withBoxModelProps(styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`);

export const Text = withBoxModelProps(styled.p`
  font-size: ${(props) => `${props.size}px`};
  font-weight: ${(props) => WEIGHTS.get(props.weight)};
  color: ${(props) => props.color || cssConstants.PRIMARY_LIGHT_BLACK};
  margin: ${(props) => props.margin || 0};
  text-align: ${(props) => props.textAlign};
  opacity: ${(props) => props.opacity};
  cursor: ${(props) => props.cursor || 'default'};
  font-style: ${(props) => `${props.fontStyle}`};

  ${ellipsis};
`);
