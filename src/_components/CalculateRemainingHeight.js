// @flow

import * as React from 'react';
import styled from 'styled-components';
import { ReactHeight } from 'react-height';

const Container = styled.div`
  height: 100%;
`;

type Props = {
  children: Array<React.Node> | Array<() => React.Node>
};

type State = {
  remainingHeight: ?number
};

export class CalculateRemainingHeight extends React.Component<Props, State> {
  containerRef: React.ElementRef<any>;

  constructor(props: Props) {
    super(props);
    this.containerRef = React.createRef();
  }

  state = {
    remainingHeight: null
  };

  setRemainingHeight = (contentHeight: number) => {
    const containerNode = this.containerRef.current;
    this.setState({
      remainingHeight: containerNode.clientHeight - contentHeight
    });
  };

  render() {
    const children = [].concat(this.props.children);
    const { remainingHeight } = this.state;

    const total = children.length;

    const nodes = children.slice(0, total - 1);
    const func = children[total - 1];

    if (typeof func !== 'function') {
      throw new Error(
        'CalculateRemainingHeight: Expected the last child to be a function'
      );
    }

    return (
      <Container innerRef={this.containerRef}>
        <ReactHeight onHeightReady={this.setRemainingHeight}>
          {nodes}
        </ReactHeight>
        {remainingHeight !== 0 && func(remainingHeight)}
      </Container>
    );
  }
}
