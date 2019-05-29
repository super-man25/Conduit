// @flow

import React from 'react';
import { EDLink, Flex, Text } from '_components';
import { cssConstants } from '_constants';

type Props = {
  crumbs: Array<{
    title: string,
    path: string
  }>,
  onClick?: () => void,
  maxWidth?: string
};

function Crumb(props) {
  const { title, path, onClick, maxWidth } = props;

  return (
    <EDLink to={path} key={path} onClick={onClick} title={title}>
      <Text
        ellipsis
        style={{ maxWidth }}
        color={cssConstants.SECONDARY_BLUE}
        size="1rem"
      >
        {title}
      </Text>
    </EDLink>
  );
}

export function Breadcrumbs(props: Props) {
  const { crumbs = [], onClick, maxWidth = '200px' } = props;

  return (
    <Flex>
      {crumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          <Crumb
            {...crumb}
            index={index}
            onClick={onClick}
            maxWidth={maxWidth}
          />
          {index + 1 !== crumbs.length && <span>&nbsp;/&nbsp;</span>}
        </React.Fragment>
      ))}
    </Flex>
  );
}
