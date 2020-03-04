// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import { Flex } from '_components';

const StyledBreadcrumbLink = styled(Link)`
  font-weight: normal;
  text-decoration: underline;
`;

const StyledBreadcrumb = styled.div`
  font-weight: bold;
`;

const StyledBreadcrumbDivider = styled.div`
  font-weight: normal;
  margin: 0 5px;
`;

const Breadcrumb = ({ title, path }) => {
  const location = useLocation();

  return location.pathname === path ? (
    <StyledBreadcrumb>{title}</StyledBreadcrumb>
  ) : (
    <StyledBreadcrumbLink to={path}>{title}</StyledBreadcrumbLink>
  );
};

const BreadcrumbDivider = () => (
  <StyledBreadcrumbDivider>{'>'}</StyledBreadcrumbDivider>
);

type Props = {
  crumbs: [
    {
      title: string,
      path: string,
    }
  ],
};

export const Breadcrumbs = ({ crumbs }: Props) => (
  <Flex>
    {crumbs.map((crumb, index) => (
      <Fragment key={index}>
        <Breadcrumb title={crumb.title} path={crumb.path} />
        {index !== crumbs.length - 1 && <BreadcrumbDivider />}
      </Fragment>
    ))}
  </Flex>
);
