// @flow

import * as React from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';
import { lighten } from 'polished';
import { TextButton, SecondaryButton, PrimaryButton } from '_components';

type Props = {
  margin: string,
  padding: string
};

export const SettingButton: React.ComponentType<Props> = styled(TextButton)`
  display: flex;
  align-self: center;
  position: relative;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

export const SettingEditButton = styled(SettingButton)`
  ::before {
    content: 'EDIT';
  }
`;

export const SettingSaveButton = styled(PrimaryButton)`
  ::before {
    content: 'SAVE';
  }
`;

export const SettingCancelButton = styled(SecondaryButton)`
  color: ${lighten(0.2, cssConstants.SECONDARY_RED)};
  ::before {
    content: 'CANCEL';
  }
`;
