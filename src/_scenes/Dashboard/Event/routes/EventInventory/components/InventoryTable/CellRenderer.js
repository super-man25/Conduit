// @flow
import * as React from 'react';
import { isDefined } from '_helpers';
import { Flex } from '_components';

type Props = {
  cellData: any
};

export const defaultCellRenderer = (props: Props) => {
  const { cellData } = props;
  const value = isDefined(cellData) ? String(cellData) : '';

  return (
    <Flex align="center" marginLeft="1.25rem">
      {value}
    </Flex>
  );
};
