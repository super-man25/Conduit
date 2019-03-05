// @flow

import React from 'react';
import styled from 'styled-components';
import { EDLink, Flex, S1 } from '_components';
import { cssConstants } from '_constants';

type Props = {
  crumbs: Array<{
    title: string,
    path: string
  }>,
  onClick?: () => void
};

export const OverflowText = styled.span`
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function Crumb(props) {
  const { title, path, onClick } = props;

  return (
    <EDLink to={path} key={path} onClick={onClick} title={title}>
      <OverflowText>
        <S1 color={cssConstants.SECONDARY_BLUE} size="1rem">
          {title}
        </S1>
      </OverflowText>
    </EDLink>
  );
}

export function Breadcrumbs(props: Props) {
  const { crumbs = [], onClick } = props;

  return (
    <Flex>
      {crumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          <Crumb {...crumb} index={index} onClick={onClick} />
          {index + 1 !== crumbs.length && <span>&nbsp;/&nbsp;</span>}
        </React.Fragment>
      ))}
    </Flex>
  );
}
