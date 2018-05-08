import React from 'react';
import PropTypes from 'prop-types';
import { isDefined } from '_helpers';

export class Tabbable extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      isDefined(nextProps.selectedIndex) &&
      nextProps.selectedIndex !== prevState.selectedIndex
    ) {
      return {
        selectedIndex: nextProps.selectedIndex
      };
    }

    return null;
  }

  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };

    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(idx) {
    this.setState({
      selectedIndex: idx
    });
  }

  render() {
    return this.props.children(this.state.selectedIndex, this.onTabChange);
  }
}

Tabbable.propTypes = {
  children: PropTypes.func.isRequired
};
