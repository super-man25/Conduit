import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { cssConstants } from '../_constants';
import { history } from '../_helpers';
import { LogoName, UserWelcome, UserAvatar, SprocketMenu } from './';

export const SiteHeaderDiv = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  margin: 0;
  padding: 0;
  background: ${cssConstants.PRIMARY_DARK_BLUE};
`;

class SiteHeader extends React.Component {

  // code here that will result in the menu dropping, when we know what it is...
  static handleSprocketClick() {
    history.push('/dashboard/settings');
  }

  render() {
    const { user } = this.props;
    return (
      <SiteHeaderDiv>
        <LogoName />
        <SprocketMenu onClick={this.handleSprocketClick} />
        <UserAvatar user={user} />
        <UserWelcome user={user} />
      </SiteHeaderDiv>
    );
  }
}

SiteHeader.propTypes = {
  user: PropTypes.objectOf(PropTypes.any)
};

export { SiteHeader as SiteHeaderTest };

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedSiteHeader = connect(mapStateToProps)(SiteHeader);
export { connectedSiteHeader as SiteHeader };
