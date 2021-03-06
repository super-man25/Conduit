// @flow
import React from 'react';
import styled from 'styled-components';

import { colors } from '_constants';

const toggleSizes = {
  xsmall: {
    width: 30,
    height: 6,
    toggleRadius: 10,
  },
  small: {
    width: 40,
    height: 8,
    toggleRadius: 15,
  },
  large: {
    width: 60,
    height: 10,
    toggleRadius: 20,
  },
};

function getSliderTransformX(props) {
  const {
    isActive,
    size: { width, toggleRadius },
  } = props;

  return isActive ? width - toggleRadius : 0;
}

const Slider = styled.span`
  cursor: pointer;
  width: ${(props) => props.size.width}px;
  height: ${(props) => props.size.height}px;
  border-radius: 1rem;
  background-color: ${colors.gray};
  position: relative;

  ::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    height: ${(props) => props.size.toggleRadius}px;
    width: ${(props) => props.size.toggleRadius}px;
    left: 0;
    top: 50%;
    transform: translate(${getSliderTransformX}px, -50%);
    border: 0.5px solid ${colors.blue};
    box-shadow: 0 1px 1px ${colors.gray};
    background-color: ${colors.white};
    transition: 0.3s transform;
  }
`;

const Label = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;

  background-color: ${colors.gray};

  :checked + ${Slider} {
    background-color: ${colors.blue};
  }

  :disabled + ${Slider} {
    cursor: not-allowed;
  }
`;

type Props = {
  isChecked: boolean,
  onChange: () => void,
  isDisabled: boolean,
  size: 'large' | 'small' | 'xsmall',
  title?: string,
};

export function ToggleOLD(props: Props) {
  return (
    <Label title={props.title}>
      <Input
        type="checkbox"
        checked={props.isChecked}
        onChange={props.onChange}
        disabled={props.isDisabled}
      />
      <Slider isActive={props.isChecked} size={toggleSizes[props.size]} />
    </Label>
  );
}

ToggleOLD.defaultProps = {
  size: 'large',
};
