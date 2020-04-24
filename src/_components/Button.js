// @flow

import * as React from 'react';
import styled from 'styled-components';

import { shadows, colors } from '_constants';

type Props = {
  fontSize: string,
  textAlign: string,
  minWidth: string,
};

export const Button: React.ComponentType<Props> = styled.button`
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
`;

export const PrimaryButton = styled(Button)`
  transition: opacity 100ms ease-out;
  color: ${colors.white};
  background-color: ${colors.blue};
  border: 2px solid ${colors.blue};

  &:disabled {
    color: ${colors.gray};
    background-color: ${colors.lightGray};
    opacity: 0.5;
  }

  &:active {
    background-color: ${colors.lightBlue};
    box-shadow: ${shadows.ACTIVE_BUTTON};
  }

  &:hover:not(:disabled) {
    background-color: ${colors.blue};
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: ${colors.white};
  border: 2px solid ${colors.blue};
  color: ${colors.blue};

  &:disabled {
    border: 2px solid ${colors.gray};
    color: ${colors.gray};
    opacity: 0.5;
  }

  &:active {
    background-color: ${colors.lightBlue};
    color: ${colors.lightBlue};
    border-color: ${colors.lightBlue};
    box-shadow: ${shadows.ACTIVE_BUTTON};
  }

  &:hover:not(:disabled) {
    background-color: ${colors.lightGray};
    color: ${colors.blue};
  }
`;

export const TextButton = styled(Button)`
  color: ${colors.blue};
  background-color: inherit;

  &:disabled {
    color: ${colors.lightGray};
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    color: ${colors.lightBlue};
  }
`;
