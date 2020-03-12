// @flow

import * as React from 'react';
import styled from 'styled-components';
import { colors } from '_constants';

export const ChipButton = styled.div`
  background-color: ${(props) =>
    props.active ? props.color || colors.blue : 'transparent'};
  color: ${(props) => (props.active ? props.fontColor || colors.white : null)};
  cursor: pointer;
  font-size: ${(props) => props.fontSize || '12px'};
  padding: 8px 14px;
  min-width: 60px;
  border: none;
  border-radius: ${(props) => props.fontSize * 2 || '24px'};

  &:hover {
    background-color: ${colors.lightBlue};
    color: ${colors.white};
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
