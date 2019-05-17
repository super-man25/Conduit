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
  text-align: center;
  font-size: 1rem;
  cursor: pointer;
`;

export const SettingEditButton = styled(SettingButton)`
  color: ${cssConstants.PRIMARY_LIGHT_BLUE};
  ::before {
    content: 'EDIT';
  }
`;

export const SettingSaveButton = styled(SettingButton)`
  color: ${cssConstants.PRIMARY_LIGHT_BLUE};
  ::before {
    content: 'SAVE';
  }
`;

export const SettingCancelButton = styled(SettingButton)`
  color: ${lighten(0.2, cssConstants.SECONDARY_RED)};
  ::before {
    content: 'CANCEL';
  }
`;
