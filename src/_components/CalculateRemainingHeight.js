import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactHeight } from 'react-height';

const Container = styled.div`
  height: 100%;
`;

export class CalculateRemainingHeight extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  state = {
    remainingHeight: null
  };

  setRemainingHeight = (contentHeight) => {
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

const childProp = PropTypes.oneOfType([PropTypes.node, PropTypes.func]);

CalculateRemainingHeight.propTypes = {
  /**
   * Children to display. The last child should be a function which receives the remaining
   * height in the container as a parameter and returns a node to render.
   */
  children: PropTypes.oneOfType([childProp, PropTypes.arrayOf(childProp)])
};
