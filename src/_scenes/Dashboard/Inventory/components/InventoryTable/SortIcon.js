// @flow
import * as React from 'react';
import { IconContainer } from './styled';
import { ExpandLessIcon, ExpandMoreIcon } from '_components';
import { colors } from '_constants';

type Props = {
  isFiltered: boolean,
  filterDirection: 'asc' | 'desc',
  onClick: () => void,
};

export const SortIcon = ({ isFiltered, filterDirection, onClick }: Props) => (
  <IconContainer
    align="center"
    direction="column"
    justify="center"
    onClick={onClick}
  >
    <ExpandLessIcon
      width={14}
      height={14}
      fill={filterDirection === 'asc' && isFiltered ? colors.blue : colors.gray}
      styles={{ marginBottom: -4 }}
    />
    <ExpandMoreIcon
      width={14}
      height={14}
      fill={
        filterDirection === 'desc' && isFiltered ? colors.blue : colors.gray
      }
    />
  </IconContainer>
);
