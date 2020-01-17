//@flow
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  component: React.ElementType,
  authorized: boolean,
};

export const SecuredRoute = ({
  component: Component,
  authorized,
  ...rest
}: Props) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};
