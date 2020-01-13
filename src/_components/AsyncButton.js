// @flow

import * as React from 'react';
import { cssConstants } from '_constants';
import { PrimaryButton, Loader } from '_components';

type Props = {
  isLoading: boolean,
  disabled?: boolean,
  children: React.Node,
};

export const AsyncButton = (props: Props) => {
  const { isLoading, children, ...rest } = props;
  return (
    <PrimaryButton {...rest}>
      {props.isLoading ? (
        <Loader small color={cssConstants.PRIMARY_WHITE} />
      ) : (
        props.children
      )}
    </PrimaryButton>
  );
};
