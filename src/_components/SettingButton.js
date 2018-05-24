// @flow

import * as React from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';
import { lighten } from 'polished';

type Props = {
  margin: string,
  padding: string
};

export const SettingButton: React.ComponentType<Props> = styled.div`
  display: flex;
  align-self: center;
  position: relative;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  font-size: 1rem;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;
`;

// $FlowFixMe
export const SettingEditButton = SettingButton.extend`
  color: ${cssConstants.PRIMARY_LIGHT_BLUE};
  ::before {
    content: 'EDIT';
  }
`;

// $FlowFixMe
export const SettingSaveButton = SettingButton.extend`
  color: ${cssConstants.PRIMARY_LIGHT_BLUE};
  ::before {
    content: 'SAVE';
  }
`;

// $FlowFixMe
export const SettingCancelButton = SettingButton.extend`
  color: ${lighten(0.2, cssConstants.SECONDARY_RED)};
  ::before {
    content: 'CANCEL';
  }
`;
