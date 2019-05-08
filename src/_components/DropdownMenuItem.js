// @flow

import * as React from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';

type Props = {
  disabled?: boolean
};

const attrs = (props) => ({
  hidden: (props.hidden && 'none') || 'block',
  floating: (props.right && 'right') || (props.left && 'left') || 'none',
  color:
    (props.disabled && cssConstants.PRIMARY_DARK_GRAY) ||
    cssConstants.PRIMARY_WHITE
});

export const DropdownMenuItem: React.ComponentType<Props> = styled.span.attrs(
  attrs
)`
  display: ${(props) => props.hidden};
  position: relative;
  float: ${(props) => props.floating};
  margin: 0;
  padding-left: 10px;
  font-size: 13px;
  font-weight: lighter;
  line-height: 40px;
  color: ${(props) => props.color};
  background: transparent; 
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    color: ${(props) => props.color};
  ::before {
    content: '${(props) => props.content}';
  }
`;
