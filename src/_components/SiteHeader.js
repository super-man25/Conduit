import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withClickAway } from '_hoc';
import { cssConstants, zIndexes } from '_constants';
import {
  LogoName,
  UserWelcome,
  SprocketMenu,
  DropdownMenuItem,
  Icon,
  Spacing
} from './';
import { withRouter } from 'react-router-dom';

export const SiteHeaderDiv = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  margin: 0;
  padding: 0;
  background: ${cssConstants.PRIMARY_DARK_BLUE};
`;

export const DropdownMenuWrapper = withClickAway(styled.div`
  width: 130px;
  position: absolute;
  z-index: ${zIndexes.BASE};
  right: 0;
  top: 75px;
  padding: 15px;
  margin-right: 15px;
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

export class SiteHeaderPresenter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    };
  }

  showMenu = (event) => {
    event.preventDefault();
    this.setState({ showMenu: true });
  };

  closeMenu = (event) => {
    this.setState({ showMenu: false });
  };

  handleSettingsClick = () => {
    this.props.history.push('/settings');
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  handleLogoutClick = (e) => {
    e.preventDefault();
    this.props.authActions.signOut();
  };

  render() {
    const { auth } = this.props;
    return (
      <SiteHeaderDiv>
        <LogoName onClick={this.handleLogoClick} />
        <SprocketMenu
          id="sprocket"
          data-test-id="settings-icon"
          onClick={this.showMenu}
        />
        <UserWelcome user={auth} />
        {this.state.showMenu && (
          <DropdownMenuWrapper onClickAway={this.closeMenu}>
            <div
              ref={(element) => {
                this.dropdownMenu = element;
              }}
            >
              <DropdownMenuItem
                id="settings"
                onClick={this.handleSettingsClick}
              >
                Settings
              </DropdownMenuItem>
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
      </SiteHeaderDiv>
    );
  }
}

SiteHeaderPresenter.propTypes = {
  history: PropTypes.shape(),
  authState: PropTypes.shape()
};

const connectedSiteHeader = withRouter(SiteHeaderPresenter);
export { connectedSiteHeader as SiteHeader };
