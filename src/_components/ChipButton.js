// @flow

import * as React from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';

export const ChipButton = styled.button`
  background-color: ${(props) =>
    props.active ? props.color || cssConstants.SECONDARY_BLUE : 'transparent'};
  color: ${(props) =>
    props.active
      ? props.fontColor || cssConstants.PRIMARY_WHITE
      : cssConstants.PRIMARY_LIGHT_BLACK};
  cursor: pointer;
  font-size: ${(props) => props.fontSize || '12px'};
  padding: 8px 14px;
  min-width: 60px;
  border: none;
  outline: none;
  border-radius: ${(props) => props.fontSize * 2 || '24px'};

  &:hover {
    background-color: ${cssConstants.PRIMARY_BLUE_HOVER};
    color: ${cssConstants.PRIMARY_WHITE};
  }
`;

const ChipButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: row;

  ${ChipButton} + ${ChipButton} {
    margin-left: 12px;
  }
`;

type Props = {
  children: React.Node,
  onChange: (value: any) => void,
  value: any,
  handleChange: () => void,
};

export class ChipButtonGroup extends React.Component<Props> {
  static defaultProps = {
    handleChange: () => {},
  };

  cloneChildren(children: React.Node) {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        ...child.props,
        active: child.props.value === this.props.value,
        onClick: () => this.props.onChange(child.props.value),
      });
    });
  }

  render() {
    const { children } = this.props;

    return (
      <ChipButtonGroupContainer>
        {this.cloneChildren(children)}
      </ChipButtonGroupContainer>
    );
  }
}
