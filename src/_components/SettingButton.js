// @flow
import * as React from 'react';
import styled from 'styled-components';

import { colors } from '_constants';
import { TextButton, SecondaryButton, PrimaryButton } from '_components';

type Props = {
  margin: string,
  padding: string,
};

export const SettingButton: React.ComponentType<Props> = styled(TextButton)`
  display: flex;
  align-self: center;
  position: relative;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  max-width: 100px;
  font-weight: ${(props) => props.weight};
`;

export const SettingEditButton = styled(SettingButton)`
  ::before {
    content: 'Edit';
  }
`;

export const SettingSaveButton = styled(PrimaryButton)`
  ::before {
    content: 'Save';
  }
`;

export const SettingCancelButton = styled(SecondaryButton)`
  color: ${colors.red};
  ::before {
    content: 'Cancel';
  }
`;
