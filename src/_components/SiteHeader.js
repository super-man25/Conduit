import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { cssConstants } from '../_constants';
import { LogoName, UserWelcome, SprocketMenu } from './';
import { withRouter } from 'react-router-dom';

export const SiteHeaderDiv = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  margin: 0;
  padding: 0;
  background: ${cssConstants.PRIMARY_DARK_BLUE};
`;

export class SiteHeaderPresenter extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleSprocketClick = this.handleSprocketClick.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
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
        <SprocketMenu id="sprocket" onClick={this.handleSprocketClick} />
        <UserWelcome user={authState.model} />
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
