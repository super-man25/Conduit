// @flow
import * as React from 'react';
import { isDefined } from '_helpers';

type Props = {
  selectedIndex?: number,
  children: (
    selectedIndex: number,
    onTabChange: (index: number) => void
  ) => React.Node,
};

type State = {
  selectedIndex: number,
};

export class Tabbable extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (
      isDefined(nextProps.selectedIndex) &&
      nextProps.selectedIndex !== prevState.selectedIndex
    ) {
      return {
        selectedIndex: nextProps.selectedIndex,
      };
    }

    return null;
  }

  state = {
    selectedIndex: 0,
  };

  onTabChange = (idx: number) => {
    this.setState({
      selectedIndex: idx,
    });
  };

  render() {
    return this.props.children(this.state.selectedIndex, this.onTabChange);
  }
}
