// @flow

import React from 'react';
import { EDLink, Flex, S1 } from '_components';
import { cssConstants } from '_constants';

type Props = {
  crumbs: Array<{
    title: string,
    path: string
  }>,
  onClick?: () => void
};

export function Breadcrumbs(props: Props) {
  const { crumbs = [], onClick } = props;

  return (
    <Flex>
      {crumbs.map(({ title, path }, index) => (
        <EDLink to={path} key={index} onClick={onClick}>
          {(() =>
            index !== crumbs.length - 1 ? (
              <S1 color={cssConstants.SECONDARY_BLUE} size="1rem">
                &nbsp;{title}&nbsp;/
              </S1>
            ) : (
              <S1 color={cssConstants.SECONDARY_BLUE_BLACK} size="1rem">
                &nbsp;{title}
              </S1>
            ))()}
        </EDLink>
      ))}
    </Flex>
  );
}
