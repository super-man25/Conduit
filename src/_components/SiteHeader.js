import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withClickAway } from '_hoc';
import { cssConstants } from '_constants';
import {
  LogoName,
  UserWelcome,
  SprocketMenu,
  DropdownMenuItem,
  Icon,
  Spacing
} from './';
import { withRouter } from 'react-router-dom';
import { actions as authActions } from '_state/auth';
import { bindActionCreators } from 'redux';

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
  position: fixed;
  z-index: 1000;
  right: 0;
  top: 75px;
  padding: 15px;
  margin-right: 15px;
  background: ${cssConstants.SECONDARY_LIGHT_BLUE};
  box-shadow: 5px 10px 18px ${cssConstants.PRIMARY_LIGHT_GRAY};
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
    border-bottom-color: #719ece;
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
  }

  closeMenu = (event) => {
    if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false });
    }
  }

  handleSettingsClick = () => {
    this.props.history.push('/settings');
  }

  handleLogoClick = () => {
    this.props.history.push('/');
  }

  handleLogoutClick = (e) => {
    e.preventDefault();
    this.props.authActions.signOut();
  }

  render() {
    const { authState } = this.props;
    return (
      <SiteHeaderDiv>
        <LogoName onClick={this.handleLogoClick} />
        <SprocketMenu
          id="sprocket"
          data-test-id="settings-icon"
          onClick={this.showMenu}
        />
        <UserWelcome user={authState.model} />
        {this.state.showMenu && (
          <DropdownMenuWrapper onClickAway={this.closeMenu}>
            <div
              ref={(element) => {
                this.dropdownMenu = element;
              }}
            >
              <DropdownMenuItem onClick={this.handleSettingsClick}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
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

function mapStateToProps(state) {
  return {
    authState: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

const connectedSiteHeader = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SiteHeaderPresenter)
);
export { connectedSiteHeader as SiteHeader };
