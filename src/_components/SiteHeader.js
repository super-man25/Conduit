// @flow
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { isMobileDevice } from '_helpers';
import settingsIcon from '_images/settingsIcon.svg';
import logoSvg from '_images/logo.svg';
import {
  colors,
  zIndexes,
  navigationHeight,
  mobileBreakpoint,
  containerPadding,
} from '_constants';
import { useClickAway, useSidebar } from '_hooks';
import { actions as authActions } from '_state/auth';
import { actions as clientActions } from '_state/client';
import { actions as clientListActions } from '_state/clientList';
import { Icon, Flex, UserWelcome } from './';

const StyledSiteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: ${navigationHeight}px;
  padding: 0 ${containerPadding}px;
  background: ${colors.blue};
`;

const Logo = styled.img`
  display: block;

  @media (max-width: ${mobileBreakpoint}px) {
    max-width: 150px;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  z-index: ${zIndexes.BASE};
  display: flex;
  align-items: center;
`;

const caretWidth = 20;

const DropdownMenu = styled.div`
  position: absolute;
  right: -10px;
  top: calc(100% + ${caretWidth / 2}px);
  padding: 25px;
  background: ${colors.blue};
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);

  ::before,
  ::after {
    content: '';
    width: ${caretWidth}px;
    height: ${caretWidth}px;
    transform: rotate(45deg);
    position: absolute;
    bottom: calc(100% - ${caretWidth}px / 2);
    right: ${caretWidth / 2}px;
    background-color: ${colors.blue};
  }

  ::before {
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
`;

const MenuIcon = styled.img`
  width: 20px;
  cursor: pointer;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  white-space: nowrap;

  &:not(:last-of-type) {
    margin-bottom: 25px;
  }
`;

const LogoutIcon = styled(Icon)`
  margin-left: 10px;
`;

const SidebarToggle = styled(Icon)`
  margin-right: 15px;
`;

export const SiteHeader = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, toggleSidebar] = useSidebar();

  const auth = useSelector(({ auth }) => auth.model || {});
  const client = useSelector(({ client }) => client);
  const clientList = useSelector(({ clientList }) => clientList);
  const hasTicketsDotComIntegration = useSelector(({ client }) =>
    client.integrations.some(
      (integration) => integration.name === 'Tickets.com'
    )
  );

  const dropdownRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(clientListActions.fetchClientList());
  }, [dispatch]);

  useClickAway({
    ref: dropdownRef,
    handleClickAway: () => setShowMenu(false),
  });

  return (
    <StyledSiteHeader>
      <Flex align="center">
        {isMobileDevice && (
          <SidebarToggle
            onClick={toggleSidebar}
            name={isSidebarOpen ? 'arrowLeft' : 'arrowRight'}
            size={24}
            color={colors.white}
          />
        )}
        <Link to="/">
          <Logo alt="logo" src={logoSvg} />
        </Link>
      </Flex>
      <Flex>
        <UserWelcome
          firstName={auth.firstName}
          lastName={auth.lastName}
          client={client}
          clientList={clientList}
          updateClient={(client) => dispatch(clientActions.update(client))}
        />
        <DropdownContainer ref={dropdownRef}>
          <MenuIcon src={settingsIcon} onClick={() => setShowMenu(!showMenu)} />
          {showMenu && (
            <DropdownMenu>
              <MenuItem to="/settings/team">Settings</MenuItem>
              {hasTicketsDotComIntegration && (
                <MenuItem to="/pricing">Pricing Rules</MenuItem>
              )}
              <MenuItem
                to="/login"
                onClick={() => dispatch(authActions.signOut())}
              >
                Logout
                <LogoutIcon name="logout" size={18} color="white" />
              </MenuItem>
            </DropdownMenu>
          )}
        </DropdownContainer>
      </Flex>
    </StyledSiteHeader>
  );
};
