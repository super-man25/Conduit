// @flow

import * as React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { colors } from '_constants';

const WEIGHTS = new Map()
  .set('normal', '400')
  .set('heavy', '500')
  .set('light', '300')
  .set('lighter', '200');

const attrs = (props) => ({
  size:
    (props.size === 'small' && '0.875rem') ||
    (props.size === 'medium' && '1rem') ||
    (props.size === 'large' && '1.2rem') ||
    '1rem', // default
});

type Props = {
  size: 'small' | 'medium' | 'large',
  weight: 'normal' | 'heavy' | 'light' | 'lighter',
};

export const EDLink: React.ComponentType<Props> = styled(Link).attrs(attrs)`
  text-decoration: none;
  font-size: ${(props) => props.size};
  color: ${(props) => props.color || colors.blue};
  font-weight: ${(props) => WEIGHTS.get(props.weight) || 'normal'};
  transition: all 0.1s ease-in-out;

  &:focus,
  &:hover {
    outline: 0;
    text-decoration: none;
    cursor: pointer;
    color: ${colors.blue};
    text-shadow: 0 0 0.5px ${colors.blue};
  }

  &:active,
  &:visited {
    outline: 0;
    text-decoration: none;
  }
`;

export const EDNavLink = styled(NavLink).attrs(attrs)`
  text-decoration: none;
  font-size: ${(props) => props.size};
  color: ${colors.gray};
  font-weight: ${(props) => WEIGHTS.get(props.weight) || 'normal'};
  transition: all 0.1s ease-in-out;

  &:focus,
  &:hover {
    outline: 0;
    text-decoration: none;
    cursor: pointer;
    color: ${colors.blue};
    text-shadow: 0 0 0.5px ${colors.blue};
  }

  &:active,
  &:visited {
    outline: 0;
    text-decoration: none;
  }
`;
