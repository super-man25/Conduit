// @flow

import React from 'react';
import { Flex, H5, HR, S1, Integration, Box } from '_components';
import styled from 'styled-components';
import { Portal } from '_components/Portal';
import { IntegrationToggleAlertModal } from './IntegrationToggleAlertModal';
import type { EDIntegration } from '_models';

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

type State = {
  toggledIntegration: ?EDIntegration
};

export class TeamIntegrations extends React.Component<Props, State> {
  state = { toggledIntegration: null };

  onIntegrationChanged = (integration: EDIntegration) => {
    this.setState({
      toggledIntegration: integration
    });
  };

  onCancelToggleIntegration = () => {
    this.setState({ toggledIntegration: null });
  };

  onConfirmToggleIntegration = () => {
    if (!this.state.toggledIntegration) return;

    this.props.handleIntegrationToggle(
      this.state.toggledIntegration,
      !this.state.toggledIntegration.isActive
    );
    this.setState({ toggledIntegration: null });
  };

  render() {
    const { primary, secondary, handleIntegrationToggle } = this.props;
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
              <IntegrationsGridLayout>
                {primary.map((i, index) => (
                  <Integration
                    key={index}
                    {...i}
                    onChange={(e) => handleIntegrationToggle(i, e)}
                  />
                ))}
              </IntegrationsGridLayout>
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
              <IntegrationsGridLayout>
                {secondary.map((i, index) => (
                  <Integration
                    key={index}
                    {...i}
                    onChange={(e) => this.onIntegrationChanged(i)}
                  />
                ))}
              </IntegrationsGridLayout>
            </React.Fragment>
          </Box>
        )}
        {this.state.toggledIntegration && (
          <Portal>
            <IntegrationToggleAlertModal
              onCancel={this.onCancelToggleIntegration}
              onConfirm={this.onConfirmToggleIntegration}
              integration={this.state.toggledIntegration}
            />
          </Portal>
        )}
      </TeamIntegrationsWrapper>
    );
  }
}
