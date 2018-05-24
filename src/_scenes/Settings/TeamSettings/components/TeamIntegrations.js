// @flow

import React from 'react';
import { Flex, H5, HR, S1, Integration } from '_components';
import styled from 'styled-components';

const TeamIntegrationsWrapper = Flex.extend`
  flex-direction: column;
  justify-content: space-between;
`;

const IntegrationsGridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem 2rem;
  width: 70%;
  margin: 0.5rem 0;
`;

type ClientIntegration = {
  id: number,
  appId: string,
  name: string,
  version: string,
  createdAt: Date,
  modifiedAt: Date,
  isPrimary: boolean,
  isActive: boolean
};

type Props = {
  primary: Array<ClientIntegration>,
  secondary: Array<ClientIntegration>,
  handleIntegrationToggle: (i: ClientIntegration, e: any) => void
};

export function TeamIntegrations(props: Props) {
  return (
    <TeamIntegrationsWrapper>
      <H5 type="secondary">Integrations</H5>
      {!!props.primary && (
        <React.Fragment>
          <S1 weight="300">
            <i>Primary Integration</i>
          </S1>
          <HR />
          <IntegrationsGridLayout>
            {props.primary.map((i, index) => (
              <Integration
                key={index}
                {...i}
                onChange={(e) => props.handleIntegrationToggle(i, e)}
              />
            ))}
          </IntegrationsGridLayout>
        </React.Fragment>
      )}
      <br />
      <br />
      <br />
      <br />
      {!!props.secondary && (
        <React.Fragment>
          <S1 weight="300">
            <i>Secondary Integrations</i>
          </S1>
          <HR />
          <IntegrationsGridLayout>
            {props.secondary.map((i, index) => (
              <Integration
                key={index}
                {...i}
                onChange={(e) => props.handleIntegrationToggle(i, e)}
              />
            ))}
          </IntegrationsGridLayout>
        </React.Fragment>
      )}
    </TeamIntegrationsWrapper>
  );
}
