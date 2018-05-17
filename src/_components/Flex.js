// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';

type FlexContentAlignment =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-around'
  | 'space-between';

type FlexAlignment =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'baseline'
  | 'stretch';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

type FlexProps = {
  +flex: string,
  +height: string,
  +width: string,
  +flexGrow: number,
  +flexShrink: number,
  +flexBasis: number,
  +flexWrap: FlexWrap,
  +direction: FlexDirection,
  +order: number,
  +inline: boolean,
  +column: boolean,
  +reverse: boolean,
  +align: FlexContentAlignment,
  +justify: FlexContentAlignment,
  +alignItems: FlexAlignment,
  +alignSelf: FlexAlignment
};

function generateFlexDirection(props: FlexProps): FlexDirection {
  const { column, reverse, direction } = props;

  if (direction) return direction;

  return column
    ? reverse
      ? 'column-reverse'
      : 'column'
    : reverse
      ? 'row-reverse'
      : 'row';
}

export const Flex: ComponentType<FlexProps> = styled.div`
  display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
  flex: ${(props) => props.flex};
  flex-direction: ${generateFlexDirection}
  flex-grow: ${(props) => props.flexGrow};
  flex-shrink: ${(props) => props.flexShrink};
  flex-basis: ${(props) => props.flexBasis};
  flex-wrap: ${(props) => props.flexWrap};
  order: ${(props) => props.order};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  align-content: ${(props) => props.alignContent};
  align-self: ${(props) => props.alignSelf};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

type FlexItemProps = {
  flex: number,
  width: string,
  height: string,
  alignSelf: FlexAlignment,
  margin: string,
  padding: string
};

export const FlexItem: ComponentType<FlexItemProps> = styled.div`
  flex: ${(props) => props.flex};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  align-self: ${(props) => props.alignSelf};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

// $FlowFixMe - FlexItem defaultProps
FlexItem.defaultProps = {
  flex: 1
};

Flex.displayName = 'Flex';
FlexItem.displayName = 'FlexItem';
