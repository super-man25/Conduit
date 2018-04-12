import React from 'react';
import { connect } from 'react-redux';
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
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleSprocketClick = this.handleSprocketClick.bind(this);
  }

  handleSprocketClick(e) {
    // code here that will result in the menu dropping, when we know what it is...
    history.push('/dashboard/settings')
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
    )
  }
}

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
