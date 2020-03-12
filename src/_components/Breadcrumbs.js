// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const StyledBreadcrumb = styled.div`
  font-weight: bold;
`;

const BreadcrumbLink = styled(Link)`
  font-weight: normal;
  text-decoration: underline;
`;

const BreadcrumbDivider = styled.div`
  font-weight: normal;
  margin: 0 5px;
`;

const StyledBreadcrumbs = styled.div`
  display: flex;
  margin-bottom: 25px;
`;

const Breadcrumb = ({ title, path }) => {
  const location = useLocation();

  return location.pathname === path ? (
    <StyledBreadcrumb>{title}</StyledBreadcrumb>
  ) : (
    <BreadcrumbLink to={path}>{title}</BreadcrumbLink>
  );
};

type Props = {
  crumbs: [
    {
      title: string,
      path: string,
    }
  ],
};

export const Breadcrumbs = ({ crumbs }: Props) => (
  <StyledBreadcrumbs>
    {crumbs.map((crumb, index) => (
      <Fragment key={index}>
        <Breadcrumb title={crumb.title} path={crumb.path} />
        {index !== crumbs.length - 1 && (
          <BreadcrumbDivider>{'>'}</BreadcrumbDivider>
        )}
      </Fragment>
    ))}
  </StyledBreadcrumbs>
);
