import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { cssConstants } from '../_constants';
import { LogoName, UserWelcome, SprocketMenu, LinkButton, DropdownMenuItem, Icon, Spacing } from './';
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

export const WrapperDropdown = styled.div`
  width: 130px;
  position: fixed;
  z-index: 1000;
  right: 0;
  top: 75px;
  padding: 15px;
  background: ${cssConstants.SECONDARY_LIGHT_BLUE};
  ::after, ::before {
    bottom: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  ::after {
    border-color: rgba(255, 255, 255, 0);
    border-bottom-color: ${cssConstants.SECONDARY_LIGHT_BLUE};
    border-width: 19px;
    left: 70%;
    margin-left: -19px;
  }
  ::before {
      border-color: rgba(113, 158, 206, 0);
      border-bottom-color: #719ECE;
      border-width: 20px;
      left: 70%;
      margin-left: -20px;
}
`;

export class SiteHeaderPresenter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    }

    this.handleSprocketClick = this.handleSprocketClick.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
  
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    
    if (this.dropdownMenu && !this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  handleSprocketClick() {
    // code here that will result in the menu dropping, when we know what it is...
    this.closeMenu;
    this.props.history.push('/settings');
  }

  handleLogoClick() {
    this.props.history.push('/');
  }

  handleLogoutClick(e) {
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
        {
          this.state.showMenu
            ? (
              <WrapperDropdown>
                <div
                  ref={(element) => {
                    this.dropdownMenu = element;
                  }}
                >
                  <DropdownMenuItem onClick={this.handleSprocketClick}> Settings </DropdownMenuItem>
                  <DropdownMenuItem 
                    data-test-id="logout-button"
                    to="/logout"
                    onClick={this.handleLogoutClick.bind(this)}
                  > 
                    Logout 
                    <Spacing right padding="0 0 0 30px" display="inline-block">
                      <Icon name="award" size={24} color="white"></Icon>
                    </Spacing>
                  </DropdownMenuItem>
                </div>
              </WrapperDropdown>
            )
            : (
              null
            )
        }
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
