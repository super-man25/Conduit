// @flow

import * as React from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';
import { withBoxModelProps } from '_helpers/style-utils';

const TYPES = new Map()
  .set('primary', cssConstants.PRIMARY_DARKEST_GRAY)
  .set('secondary', cssConstants.PRIMARY_BLUE)
  .set('tertiary', cssConstants.PRIMARY_DARK_GRAY)
  .set('disabled', cssConstants.PRIMARY_GRAY);

const SIZES = new Map()
  .set('small', '0.875rem')
  .set('medium', '1rem')
  .set('large', '1.2rem')
  .set('xlarge', '2rem');

const WEIGHTS = new Map()
  .set('normal', '400')
  .set('heavy', '500')
  .set('light', '300')
  .set('lighter', '200');

type Props = {
  size: 'small' | 'medium' | 'large' | 'xlarge',
  weight: 'normal' | 'heavy' | 'light' | 'lighter',
  types: 'primary' | 'secondary' | 'tertiary'
};

export const EDText: React.ComponentType<Props> = withBoxModelProps(styled.div`
  font-size: ${(props) => SIZES.get(props.size) || '1rem'};
  color: ${(props) =>
    TYPES.get(props.type) || cssConstants.PRIMARY_DARKEST_GRAY};
  font-weight: ${(props) => WEIGHTS.get(props.weight) || 'normal'};
  margin: ${(props) => props.margin || 0};
  padding: ${(props) => props.padding || 0};
`);
