import styled, { css } from 'styled-components';

import { colors } from '_constants';
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
  color: ${(props) => (!props.color ? props.color : colors.black)};
  font-size: ${(props) => (!props.size ? props.size : '36px')};
  font-weight: ${(props) => (!props.weight ? props.weight : 'normal')};
`);

export const H2 = styled.h2`
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-size: ${(props) => (props.size ? props.size : '28px')};
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
`;

export const H3 = styled.h3.attrs((props) => ({
  color:
    (props.type === 'secondary' && colors.blue) ||
    (props.type === 'tertiary' && colors.black) ||
    colors.blue,
}))`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size || '22px'};
  font-weight: ${(props) => WEIGHTS.get(props.weight) || 'normal'};
`;

export const H4 = withBoxModelProps(
  styled.h4.attrs((props) => ({
    color: (props.type === 'secondary' && colors.gray) || null,
  }))`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size || '18px'};
    font-weight: ${(props) => props.weight || 'normal'};
  `
);

export const H5 = styled.h5.attrs((props) => ({
  color: (props.type === 'secondary' && colors.gray) || colors.black,
}))`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size || '14px'};
  font-weight: ${(props) => props.weight || 300};
`;

export const P1 = styled.p.attrs((props) => ({
  size: props.size === 'small' ? '0.875rem' : props.size,
}))`
  margin: 0;
  color: ${(props) => props.color || colors.black};
  font-size: ${(props) => props.size || '1rem'};
  font-weight: ${(props) => props.weight || 'normal'};
  font-family: ${(props) => props.font};
  letter-spacing: ${(props) => props.letterSpacing};
`;

export const S1 = styled.span`
  color: ${(props) => props.color || colors.black};
  font-size: ${(props) => props.size || '12px'};
  font-weight: ${(props) => props.weight || 'normal'};

  ${ellipsis};
`;

export const Label = styled.label`
  display: ${(props) => (props.inline ? 'inline-block' : 'block')};
  color: ${(props) => (props.color ? props.color : colors.black)};
  font-size: ${(props) => props.size || '14px'};
  font-weight: ${(props) => props.weight || 'normal'};
`;

export const HR = styled.hr`
  width: 100%;
  opacity: 0.5;
  margin: ${(props) => props.margin || '2rem 0'};
  color: ${(props) => props.color || colors.lightGray};
`;

export const Box = withBoxModelProps(styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`);

export const Text = withBoxModelProps(styled.p`
  font-size: ${(props) => props.size && `${props.size}px`};
  font-weight: ${(props) => WEIGHTS.get(props.weight)};
  color: ${(props) => props.color || null};
  margin: ${(props) => props.margin || 0};
  text-align: ${(props) => props.textAlign};
  opacity: ${(props) => props.opacity};
  cursor: ${(props) => props.cursor};
  font-style: ${(props) => props.fontStyle};
  text-transform: ${(props) => props.textTransform};
  ${ellipsis};
`);
