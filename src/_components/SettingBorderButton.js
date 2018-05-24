// @flow

import * as React from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';

type Props = {
  type: 'default' | 'disabled' | 'danger',
  disable: boolean
};

const TYPES = new Map()
  .set('default', cssConstants.SECONDARY_LIGHTEST_BLUE)
  .set('disabled', cssConstants.PRIMARY_DARK_GRAY)
  .set('danger', cssConstants.SECONDARY_RED);

export const SettingBorderButton: React.ComponentType<
  Props
> = styled.button.attrs({
  color: (props) =>
    TYPES.get(props.type) || cssConstants.SECONDARY_LIGHTEST_BLUE,
  bordercolor: (props) =>
    TYPES.get(props.type) || cssConstants.SECONDARY_LIGHTEST_BLUE
})`
  text-transform: uppercase;
  width: 5.5rem;
  height: 2.875rem;
  border: 2px solid ${cssConstants.SECONDARY_LIGHTEST_BLUE};
  border-radius: 3px;
  color: ${(props) => props.color};
  border-color: ${(props) => props.bordercolor};
  font-size: 1rem;
  text-align: center;
  margin: 0;
  padding: 0;
  background: ${cssConstants.PRIMARY_WHITE};
  cursor: pointer;
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    color: ${(props) => props.color};
    border-color: ${(props) => props.bordercolor};
  }
`;
