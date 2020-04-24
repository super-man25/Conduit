// @flow

import React from 'react';
import styled from 'styled-components';

import { Flex, FlexItem, H5, HR, S1, Box } from '_components';
import { Integration } from './Integration';

const TeamIntegrationsWrapper = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
`;

type ClientIntegration = {
  id: number,
  appId: string,
  name: string,
  version: string,
  createdAt: string,
  modifiedAt: string,
  isPrimary: boolean,
  isActive: boolean,
};

type Props = {
  primaryIntegrations: Array<ClientIntegration>,
  secondaryIntegrations: Array<ClientIntegration>,
};

export const TeamIntegrations = (props: Props) => {
  const { primaryIntegrations, secondaryIntegrations } = props;

  return (
    <TeamIntegrationsWrapper>
      <Box>
        <H5 type="secondary">Integrations</H5>
        {!!primaryIntegrations && (
          <React.Fragment>
            <S1 weight="300">
              <i>Primary Integration</i>
            </S1>
            <HR />
            <Flex flexWrap="wrap">
              {primaryIntegrations.map((i, index) => (
                <FlexItem flex="0 1 auto" margin="1rem" key={index}>
                  <Integration {...i} />
                </FlexItem>
              ))}
            </Flex>
          </React.Fragment>
        )}
      </Box>
      {!!secondaryIntegrations && (
        <Box marginTop="4rem">
          <React.Fragment>
            <S1 weight="300">
              <i>Secondary Integrations</i>
            </S1>
            <HR />
            <Flex flexWrap="wrap" margin="-1rem">
              {secondaryIntegrations.map((i, index) => (
                <FlexItem flex="0 1 auto" margin="1rem" key={index}>
                  <Integration {...i} />
                </FlexItem>
              ))}
            </Flex>
          </React.Fragment>
        </Box>
      )}
    </TeamIntegrationsWrapper>
  );
};
