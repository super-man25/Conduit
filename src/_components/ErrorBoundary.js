// @flow

import React from 'react';
import { CenteredContainer } from '_components';
import type { Node } from 'react';

type Props = {
  children: Node
};

type State = {
  hasError: boolean
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
    console.error(error, info);
    // logErrorToMyService(error, info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <CenteredContainer>
          <h1>Something went wrong.</h1>;
        </CenteredContainer>
      );
    }
    return this.props.children;
  }
}
