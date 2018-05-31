// @flow
import * as React from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';

type Props = {
  hidden: boolean,
  secondary: boolean,
  disabled: boolean,
  collapse: boolean,
  expand: boolean,
  small: boolean
};

export const Button: React.ComponentType<Props> = styled.button`
  display: ${(props) => (props.hidden ? 'none' : 'block')};
  color: ${(props) =>
    !props.secondary
      ? cssConstants.PRIMARY_WHITE
      : props.disabled
        ? cssConstants.PRIMARY_WHITE
        : cssConstants.PRIMARY_LIGHT_BLUE};
  font-size: ${(props) => (props.collapse || props.expand ? '16px' : '0.8em')};
  font-weight: 200;
  width: ${(props) => (props.collapse || props.expand ? '30px' : '100%')};
  margin: 0;
  margin-top: ${(props) =>
    props.collapse ? '20px' : props.expand ? '16px' : '10px'};
  margin-bottom : ${(props) =>
    props.collapse ? 'auto' : props.expand ? 'auto' : '10px'};
  margin-right: ${(props) => (props.collapse || props.expand ? '20px' : '0')};
  padding: ${(props) => (props.collapse || props.expand ? '0.4em' : '0.8em')};
  padding-top: ${(props) =>
    props.collapse || props.expand ? '0.3em' : props.small ? '0.6em' : '0.9em'};
  padding-bottom: ${(props) =>
    props.collapse || props.expand
      ? '0.3em'
      : props.small
        ? '0.55em'
        : '0.85em'};
  border: 2px solid;
  border-radius: 3px;
  border-color: ${(props) =>
    props.disabled
      ? cssConstants.PRIMARY_LIGHT_GRAY
      : props.secondary
        ? cssConstants.PRIMARY_LIGHT_BLUE
        : cssConstants.PRIMARY_LIGHT_BLUE};
  background-color: ${(props) =>
    props.disabled
      ? cssConstants.PRIMARY_LIGHT_GRAY
      : props.secondary
        ? cssConstants.PRIMARY_WHITE
        : cssConstants.PRIMARY_LIGHT_BLUE};
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    color: ${(props) =>
      props.disabled
        ? cssConstants.PRIMARY_WHITE
        : props.secondary
          ? cssConstants.SECONDARY_BLUE
          : cssConstants.PRIMARY_WHITE};
    background-color: ${(props) =>
      props.disabled
        ? cssConstants.PRIMARY_LIGHT_GRAY
        : props.secondary
          ? cssConstants.PRIMARY_WHITE
          : cssConstants.SECONDARY_BLUE};
    border-color: ${(props) =>
      props.disabled
        ? cssConstants.PRIMARY_LIGHT_GRAY
        : props.secondary
          ? cssConstants.SECONDARY_BLUE
          : cssConstants.SECONDARY_BLUE};
  }
  ::before {
    content: '${(props) => (props.collapse ? '<' : props.expand ? '>' : '')}';
  }
`;
