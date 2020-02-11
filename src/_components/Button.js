// @flow

import * as React from 'react';
import styled from 'styled-components';
import { cssConstants, shadows } from '_constants';
import { withBoxModelProps } from '_helpers/style-utils';

type Props = {
  fontSize: string,
  textAlign: string,
  minWidth: string,
};

export const Button: React.ComponentType<Props> = withBoxModelProps(styled.button`
  border: none;
  min-width: ${(props) => props.minWidth || '100px'};
  padding: 1rem 2rem;
  text-align: ${(props) => props.textAlign || 'center'};
  border-radius: 3px;
  font-size: ${(props) => props.fontSize || '1rem'};
  cursor: pointer;
  transition-duration: 0.3s;

  &:disabled {
    cursor: not-allowed;
  }
`);

export const PrimaryButton = styled(Button)`
  transition: opacity 100ms ease-out;
  color: ${cssConstants.PRIMARY_WHITE};
  background-color: ${cssConstants.PRIMARY_BLUE};

  &:disabled {
    color: ${cssConstants.PRIMARY_GRAY};
    background-color: ${cssConstants.PRIMARY_LIGHT_GRAY};
    opacity: 0.5;
  }

  &:active {
    background-color: ${cssConstants.PRIMARY_LIGHT_BLUE};
    box-shadow: ${shadows.ACTIVE_BUTTON};
  }

  &:hover:not(:disabled) {
    background-color: ${cssConstants.PRIMARY_BLUE_HOVER};
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: ${cssConstants.PRIMARY_WHITE};
  border: 2px solid ${cssConstants.PRIMARY_BLUE};
  color: ${cssConstants.PRIMARY_BLUE};
  transition: border linear;

  &:disabled {
    border: 2px solid ${cssConstants.PRIMARY_GRAY};
    color: ${cssConstants.PRIMARY_GRAY};
    opacity: 0.5;
  }

  &:active {
    background-color: ${cssConstants.SECONDARY_BACKGROUND_LIGHTEST_BLUE};
    color: ${cssConstants.PRIMARY_LIGHT_BLUE};
    outline: 2px solid ${cssConstants.PRIMARY_LIGHT_BLUE};
    box-shadow: ${shadows.ACTIVE_BUTTON};
  }

  &:hover:not(:disabled) {
    border: 3px solid ${cssConstants.PRIMARY_BLUE};
    background-color: ${cssConstants.SECONDARY_BACKGROUND_LIGHTEST_BLUE};
    color: ${cssConstants.PRIMARY_BLUE};
  }
`;

export const TertiaryButton = styled(Button)`
  background-color: ${cssConstants.PRIMARY_LIGHT_GRAY};
  color: ${cssConstants.PRIMARY_LIGHT_BLACK};
  opacity: 0.8;

  &:disabled {
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    opacity: 1;
    background-color: ${cssConstants.PRIMARY_LIGHT_GRAY};
  }
`;

export const TextButton = styled(Button)`
  color: ${cssConstants.PRIMARY_BLUE};
  background-color: inherit;

  &:disabled {
    color: ${cssConstants.PRIMARY_LIGHT_GRAY};
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    color: ${cssConstants.PRIMARY_LIGHT_BLUE};
  }
`;
