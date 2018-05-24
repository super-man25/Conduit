// @flow

import * as React from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';
import { titleCase } from '_helpers/string-utils';

type Props = {
  user: {
    firstName: string,
    lastName: string
  }
};

export const UserWelcome: React.ComponentType<Props> = styled.div`
  height: 70px;
  line-height: 70px;
  width: auto;
  float: right;
  margin: 0;
  padding: 0;
  padding-right: 15px;
  font-size: 13px;
  font-weight: lighter;
  letter-spacing: .05em;
  color: ${cssConstants.PRIMARY_WHITE};
  background: 'none';
  ::before {
    content: '${(props) =>
      props.user
        ? `Welcome, ${titleCase(props.user.firstName)} ${titleCase(
            props.user.lastName
          )}`
        : ''}';
  }
`;
