// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';

const padding = (props) =>
  props.padding !== undefined &&
  css`
    padding: ${props.padding};
  `;

const margin = (props) =>
  props.margin !== undefined &&
  css`
    margin: ${props.margin};
  `;

const height = (props) =>
  props.height !== undefined &&
  css`
    height: ${props.height};
  `;

const width = (props) =>
  props.width !== undefined &&
  css`
    width: ${props.width};
  `;

const display = (props) =>
  props.display !== undefined &&
  css`
    display: ${props.display};
  `;

type Props = {
  padding?: string,
  margin?: string,
  height?: string,
  width?: string,
  display?: string
};

export const Spacing: React.ComponentType<Props> = styled.div`
  ${padding}
  ${margin}
  ${height}
  ${width}
  ${display}
`;
