import React from 'react';
import PropTypes from 'prop-types';

export class ScrollableList extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    const { scrollIndex } = this.props;
    this.scrollTo(scrollIndex);
  }

  componentDidUpdate(prevProps) {
    const { scrollIndex } = this.props;

    this.scrollTo(scrollIndex);
  }

  scrollTo = (index) => {
    if (index === -1) {
      return;
    }

    const prevTarget = index > 1 ? index-- : 0;
    const containerNode = this.containerRef.current;
    const target = containerNode.children[prevTarget];

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  render() {
    const { children, data } = this.props;

    return <div ref={this.containerRef}>{data.map(children)}</div>;
  }
}

ScrollableList.propTypes = {
  /** Function for how to render a list item */
  children: PropTypes.func.isRequired,

  /** Data for list */
  data: PropTypes.arrayOf(PropTypes.any).isRequired,

  /** Index of list item to scroll to */
  scrollIndex: PropTypes.number
};
