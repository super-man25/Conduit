import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { cssConstants } from '../_constants';
import { LogoName, UserWelcome, SprocketMenu, LinkButton, DropdownMenuItem } from './';
import { withRouter } from 'react-router-dom';

export const SiteHeaderDiv = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  margin: 0;
  padding: 0;
  background: ${cssConstants.PRIMARY_DARK_BLUE};
`;

export const WrapperDropdown = styled.div`
  width: 150px;
  position: fixed;
  z-index: 1000;
  right: 0;
  top: 75px;
  background: ${cssConstants.PRIMARY_LIGHT_BLUE};
`;

export class SiteHeaderPresenter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    }
    // This binding is necessary to make `this` work in the callback
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
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  handleSprocketClick() {
    // code here that will result in the menu dropping, when we know what it is...
    this.props.history.push('/settings');
  }

  handleLogoClick() {
    this.props.history.push('/');
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
                  <DropdownMenuItem> Settings </DropdownMenuItem>
                  <DropdownMenuItem> Logout </DropdownMenuItem>
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

const connectedSiteHeader = withRouter(
  connect(mapStateToProps)(SiteHeaderPresenter)
);
export { connectedSiteHeader as SiteHeader };
