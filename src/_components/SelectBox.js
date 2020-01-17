// @flow

import * as React from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';

const SIZES = new Map()
  .set('small', '0.875rem')
  .set('medium', '1rem')
  .set('large', '1.2rem')
  .set('xlarge', '2rem');

type Props = {
  noBg: boolean,
  size: 'small' | 'medium' | 'large' | 'xlarge',
  margin: string,
  padding: string,
  border: string,
  background: string,
};
export const SelectBox: React.ComponentType<Props> = styled.select.attrs(
  (props) => ({
    color: props.noBg
      ? cssConstants.PRIMARY_LIGHT_BLUE
      : cssConstants.PRIMARY_DARKEST_GRAY,
    background: props.noBg ? 'transparent' : cssConstants.PRIMARY_WHITE,
    border: props.noBg ? 'none' : '1px solid',
    margin: props.noBg ? '0 0 0 -10px' : 0,
  })
)`
  position: relative;
  height: 3rem;
  width: 45%;
  border: ${(props) => props.border};
  border-radius: 4px;
  color: ${(props) => props.color};
  font-size: ${(props) => SIZES.get(props.size) || '1rem'};
  margin: ${(props) => props.margin || 0};
  padding: ${(props) => props.padding || 0};
  background: ${(props) => props.background};

  &:focus {
    outline: ${(props) => {
      return props.noBg ? 0 : 'none';
    }};
  }
`;
