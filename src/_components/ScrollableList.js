// @flow

import * as React from 'react';

type Props = {
  children: () => React.Node,
  data: Array<any>,
  scrollIndex: number
};

export class ScrollableList extends React.Component<Props> {
  containerRef: React.ElementRef<any>;

  constructor(props: Props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    const { scrollIndex } = this.props;
    this.scrollTo(scrollIndex);
  }

  componentDidUpdate(prevProps: Props) {
    const { scrollIndex } = this.props;
    if (prevProps.scrollIndex === -1) {
      this.scrollTo(scrollIndex);
    }
  }

  scrollTo(index: number) {
    if (index === -1) {
      return;
    }

    const prevTarget = index > 1 ? index-- : 0;
    const containerNode = this.containerRef.current;
    const target = containerNode.children[prevTarget];

    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }

  render() {
    const { children, data } = this.props;

    return <div ref={this.containerRef}>{data.map(children)}</div>;
  }
}
