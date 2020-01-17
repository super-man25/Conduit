// @flow

import * as React from 'react';
import styled from 'styled-components';

import { cssConstants } from '_constants';

type Props = {
  type: 'alert-danger' | 'alert-success' | 'hint',
  show: 'visible' | 'hidden',
};

export const HelpBlockDiv: React.ComponentType<Props> = styled.div.attrs(
  (props) => ({
    color:
      (props.type === 'alert-danger' && cssConstants.SECONDARY_RED) ||
      (props.type === 'alert-success' && cssConstants.SECONDARY_GREEN) ||
      (props.type === 'hint' && cssConstants.SECONDARY_PURPLE) ||
      cssConstants.PRIMARY_LIGHT_BLACK,
  })
)`
  color: ${(props) => props.color};
  font-size: 12px;
  font-weight: 200;
  width: 100%;
  height: 16px;
  margin: 5px 0;
  padding: 0;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;
