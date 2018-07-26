// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';

const modalRoot: ?HTMLElement = document.getElementById('modal-root');

type Props = {
  children: any
};

export class Portal extends React.Component<Props> {
  el = document.createElement('div');

  componentDidMount() {
    if (modalRoot) {
      modalRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (modalRoot) {
      modalRoot.removeChild(this.el);
    }
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}
