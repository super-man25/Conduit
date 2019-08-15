// @flow

import React, { useEffect, useState } from 'react';
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
import { actions as clientActions } from '_state/client';
import { actions as clientListActions } from '_state/clientList';
import { Box } from './StyledTags';
import { Flex } from './Flex';
import type { EDClient, EDClientList } from '_models';

export const SiteHeaderDiv = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  margin: 0;
  padding: 0 40px;
  background: ${cssConstants.PRIMARY_BLUE};
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
  background: ${cssConstants.SECONDARY_BLUE};
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
    border-bottom-color: ${cssConstants.SECONDARY_BLUE};
    border-width: 19px;
    left: 80%;
    margin-left: -19px;
  }
  ::before {
    border-color: rgba(113, 158, 206, 0);
    border-bottom-color: ${cssConstants.SECONDARY_BLUE};
    border-width: 20px;
    left: 80%;
    margin-left: -20px;
  }
`);

type Props = {
  auth: {
    firstName: string,
    lastName: string
  },
  client: EDClient,
  clientList: EDClientList,
  fetchClientList: () => void,
  hasTicketsDotComIntegration: boolean,
  push: (path: string) => void,
  signOut: () => void,
  updateClient: () => void
};

const PositionBox = styled(Box)`
  position: relative;
`;

export const SiteHeaderPresenter = (props: Props) => {
  const {
    auth,
    client,
    clientList,
    fetchClientList,
    hasTicketsDotComIntegration,
    updateClient
  } = props;

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetchClientList();
  }, [fetchClientList]);

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleSettingsClick = () => {
    props.push('/settings/team');
  };

  const handlePricingRulesClick = () => {
    props.push('/pricing');
  };

  const handleLogoClick = () => {
    props.push('/');
  };

  const handleLogoutClick = () => {
    props.signOut();
  };

  return (
    <SiteHeaderDiv>
      <LogoName onClick={handleLogoClick} />
      <Flex>
        <UserWelcome
          firstName={auth.firstName}
          lastName={auth.lastName}
          client={client}
          clientList={clientList}
          updateClient={updateClient}
        />
        <PositionBox>
          <SprocketMenu
            id="sprocket"
            data-test-id="settings-icon"
            onClick={openMenu}
          />
          {showMenu && (
            <DropdownMenuWrapper onClickAway={closeMenu}>
              <div>
                <DropdownMenuItem
                  id="settings"
                  data-test-id="settings-button"
                  onClick={handleSettingsClick}
                >
                  Settings
                </DropdownMenuItem>
                {hasTicketsDotComIntegration && (
                  <DropdownMenuItem
                    id="pricingRules"
                    data-test-id="pricing-rules-button"
                    onClick={handlePricingRulesClick}
                  >
                    Pricing Rules
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  id="logout"
                  data-test-id="logout-button"
                  to="/logout"
                  onClick={handleLogoutClick}
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
};

const mapStateToProps = ({ auth, client, clientList }) => ({
  auth: auth.model,
  client,
  clientList,
  hasTicketsDotComIntegration: client.integrations.some(
    (integration) =>
      integration.name === integrationConstants.ticketsDotCom.name
  )
});

const mapDispatchToProps = {
  push,
  signOut: actions.signOut,
  updateClient: clientActions.update,
  fetchClientList: clientListActions.fetchClientList
};

export const SiteHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteHeaderPresenter);
