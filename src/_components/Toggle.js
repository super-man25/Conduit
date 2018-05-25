// @flow

import styled from 'styled-components';
import { cssConstants } from '_constants';
import React from 'react';

const SLIDER_WIDTH = '60px';
const SLIDER_HEIGHT = '10px';

const Slider = styled.span`
  content: '';
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: ${SLIDER_WIDTH};
  height: ${SLIDER_HEIGHT};
  border-radius: 1rem;
  background-color: ${cssConstants.PRIMARY_DARK_GRAY};
  -webkit-transition: 0.3s;
  transition: 0.3s;

  ::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    left: 0px;
    bottom: -5px;
    border: 0.5px solid ${cssConstants.SECONDARY_BLUE}
    box-shadow: 0 1px 1px ${cssConstants.PRIMARY_DARK_GRAY};
    background-color: ${cssConstants.PRIMARY_WHITE};
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }
`;

const Label = styled.label`
  position: relative;
  display: inline-block;
  position: relative;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;

  :checked + ${Slider}:before {
    -webkit-transform: translateX(200%);
    -ms-transform: translateX(200%);
    transform: translateX(200%);
  }

  :checked + ${Slider} {
    background-color: ${cssConstants.SECONDARY_BLUE};
  }

  :checked,
  :disabled + ${Slider} {
    background-color: ${cssConstants.PRIMARY_DARK_GRAY};
  }
`;

type Props = {
  isChecked: boolean,
  onChange: () => void,
  isDisabled: boolean
};

export function Toggle(props: Props) {
  return (
    <Label>
      <Input
        type="checkbox"
        defaultChecked={props.isChecked}
        onChange={props.onChange}
        disabled={props.isDisabled}
      />
      <Slider />
    </Label>
  );
}
