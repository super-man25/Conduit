// @flow

import React, { useState } from 'react';
import styled from 'styled-components';

import type { EDIntegration } from '_models';
import { Flex, FlexItem, H5, HR, S1, Integration, Box } from '_components';
import { IntegrationToggleAlertModal } from './IntegrationToggleAlertModal';

const TeamIntegrationsWrapper = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
`;

type ClientIntegration = {
  id: number,
  appId: string,
  name: string,
  version: string,
  createdAt: Date,
  modifiedAt: Date,
  isPrimary: boolean,
  isActive: boolean,
};

type Props = {
  primary: Array<ClientIntegration>,
  secondary: Array<ClientIntegration>,
  handleIntegrationToggle: (i: ClientIntegration, e: any) => void,
};

export const TeamIntegrations = (props: Props) => {
  const { primary, secondary, handleIntegrationToggle } = props;
  const [toggledIntegration: ?EDIntegration, setToggledIntegration] = useState(
    null
  );

  const onIntegrationChanged = (integration: EDIntegration) => {
    setToggledIntegration(integration);
  };

  const onCancel = () => setToggledIntegration(null);

  const onConfirmToggleIntegration = () => {
    if (!toggledIntegration) return;

    props.handleIntegrationToggle(
      toggledIntegration,
      !toggledIntegration.isActive
    );
    setToggledIntegration(null);
  };

  return (
    <TeamIntegrationsWrapper>
      <Box>
        <H5 type="secondary">Integrations</H5>
        {!!primary && (
          <React.Fragment>
            <S1 weight="300">
              <i>Primary Integration</i>
            </S1>
            <HR />
            <Flex flexWrap="wrap">
              {primary.map((i, index) => (
                <FlexItem flex="0 1 auto" margin="1rem" key={index}>
                  <Integration
                    {...i}
                    onChange={(e) => handleIntegrationToggle(i, e)}
                  />
                </FlexItem>
              ))}
            </Flex>
          </React.Fragment>
        )}
      </Box>
      {!!secondary && (
        <Box marginTop="4rem">
          <React.Fragment>
            <S1 weight="300">
              <i>Secondary Integrations</i>
            </S1>
            <HR />
            <Flex flexWrap="wrap">
              {secondary.map((i, index) => (
                <FlexItem
                  flex="0 1 auto"
                  margin="1rem"
                  height="245px"
                  key={index}
                >
                  <Integration
                    {...i}
                    onChange={(e) => onIntegrationChanged(i)}
                  />
                </FlexItem>
              ))}
            </Flex>
          </React.Fragment>
        </Box>
      )}
      {toggledIntegration && (
        <IntegrationToggleAlertModal
          onCancel={onCancel}
          onConfirm={onConfirmToggleIntegration}
          integration={toggledIntegration}
        />
      )}
    </TeamIntegrationsWrapper>
  );
};
