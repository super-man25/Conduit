// @flow

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { cssConstants, zIndexes, integrationConstants } from '_constants';
import { withClickAway } from '_hoc';
import {
  DropdownMenuItem,
  Icon,
  LogoName,
  Spacing,
  SprocketMenu,
  UserWelcome
} from './';
import { push } from 'connected-react-router';
import { actions } from '_state/auth';
import { Box } from './StyledTags';
import { Flex } from './Flex';

export const SiteHeaderDiv = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  margin: 0;
  padding: 0 40px;
  background: ${cssConstants.PRIMARY_DARK_BLUE};
  justify-content: space-between;
  align-items: center;
`;

export const DropdownMenuWrapper = withClickAway(styled.div`
  width: 130px;
  position: absolute;
  z-index: ${zIndexes.BASE};
  right: -12px;
  top: 75px;
  padding: 15px;
  background: ${cssConstants.SECONDARY_LIGHT_BLUE};
  box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.5);
  ::after,
  ::before {
    bottom: 100%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  ::after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: ${cssConstants.SECONDARY_LIGHT_BLUE};
    border-width: 19px;
    left: 80%;
    margin-left: -19px;
  }
  ::before {
    border-color: rgba(113, 158, 206, 0);
    border-bottom-color: ${cssConstants.SECONDARY_LIGHT_BLUE};
    border-width: 20px;
    left: 80%;
    margin-left: -20px;
  }
`);

type Props = {
  push: (path: string) => void,
  auth: {},
  integrations: [],
  signOut: () => void
};

type State = {
  showMenu: boolean
};

const PositionBox = Box.extend`
  position: relative;
`;

export class SiteHeaderPresenter extends React.Component<Props, State> {
  state = { showMenu: false };

  showMenu = () => {
    this.setState({ showMenu: true });
  };

  closeMenu = () => {
    this.setState({ showMenu: false });
  };

  handleSettingsClick = () => {
    this.props.push('/settings/team');
  };

  handlePricingRulesClick = () => {
    this.props.push('/pricing');
  };

  handleLogoClick = () => {
    this.props.push('/');
  };

  handleLogoutClick = () => {
    this.props.signOut();
  };

  render() {
    const { auth, integrations } = this.props;

    const hasTicketsDotComIntegration = integrations.some(
      (integration) =>
        integration.name === integrationConstants.ticketsDotCom.name
    );

    return (
      <SiteHeaderDiv>
        <LogoName onClick={this.handleLogoClick} />
        <Flex>
          <UserWelcome user={auth} data-test-id="user-name-text" />
          <PositionBox>
            <SprocketMenu
              id="sprocket"
              data-test-id="settings-icon"
              onClick={this.showMenu}
            />
            {this.state.showMenu && (
              <DropdownMenuWrapper onClickAway={this.closeMenu}>
                <div>
                  <DropdownMenuItem
                    id="settings"
                    data-test-id="settings-button"
                    onClick={this.handleSettingsClick}
                  >
                    Settings
                  </DropdownMenuItem>
                  {hasTicketsDotComIntegration && (
                    <DropdownMenuItem
                      id="pricingRules"
                      data-test-id="pricing-rules-button"
                      onClick={this.handlePricingRulesClick}
                    >
                      Pricing Rules
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    id="logout"
                    data-test-id="logout-button"
                    to="/logout"
                    onClick={this.handleLogoutClick}
                  >
                    Logout
                    <Spacing right padding="0 0 0 40px" display="inline-block">
                      <Icon name="logout" size={24} color="white" />
                    </Spacing>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuWrapper>
            )}
          </PositionBox>
        </Flex>
      </SiteHeaderDiv>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.model,
  integrations: state.client.integrations
});

const mapDispatchToProps = { push, signOut: actions.signOut };

export const SiteHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteHeaderPresenter);
