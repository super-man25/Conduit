import React from 'react';
import omit from 'lodash/omit';

export const withClickAway = (Wrapped) =>
  class VisibilityToggle extends React.Component {
    static defaultProps = {
      onClickAway: () => {}
    };

    componentDidMount() {
      document.addEventListener('mousedown', this.handleOutsideClick);
      document.addEventListener('keyup', this.handleKey);
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleOutsideClick);
      document.removeEventListener('keyup', this.handleKey);
    }

    handleOutsideClick = (event) => {
      if (this.wrappedRef && !this.wrappedRef.contains(event.target)) {
        this.props.onClickAway(event);
      }
    };

    handleKey = (event) => {
      if (this.wrappedRef && event.key === 'Escape') {
        this.props.onClickAway(event);
      }
    };

    render() {
      const passProps = omit(this.props, 'onClickAway');

      return (
        <div
          ref={(node) => {
            this.wrappedRef = node;
          }}
        >
          <Wrapped {...passProps} />
        </div>
      );
    }
  };
