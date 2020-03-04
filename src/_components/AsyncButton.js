// @flow

import * as React from 'react';
import { colors } from '_constants';
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
      {props.isLoading ? <Loader small color={colors.white} /> : props.children}
    </PrimaryButton>
  );
};
