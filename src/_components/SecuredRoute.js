//@flow
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  component: React.ElementType,
  authorized: boolean,
  componentProps: any,
};

export const SecuredRoute = ({
  component: Component,
  authorized,
  componentProps,
  ...rest
}: Props) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? (
          <Component {...props} {...componentProps} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};
