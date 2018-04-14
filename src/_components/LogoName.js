import styled from 'styled-components';
import { cssConstants } from '../_constants';
import edLogoImage from '../_images/edlogo.png';
import edLogoImageWhite from '../_images/edlogowhite.png';

const edLogo = `url(${ edLogoImage })`;
const edLogoWhite = `url(${ edLogoImageWhite })`;

export const LogoName = styled.div`
  width: 300px;
  height: 40px;
  line-height: 50px;
  margin: 0;
  padding: 0;
  float: ${(props) => { return props.login ? 'none' : 'left'; }};
  margin-left: ${(props) => { return props.login ? '0' : '20px'; }};
  padding-top: ${(props) => { return props.login ? '0' : '10px'; }};
  padding-left: ${(props) => { return props.login ? '60px' : '55px'; }};
  font-size: ${(props) => { return props.login ? '22px' : '24px'; }};
  color: ${(props) => { return props.login ? cssConstants.PRIMARTY_LIGHT_BLACK : cssConstants.PRIMARY_WHITE; }};
  background: ${(props) => { return props.login ? cssConstants.PRIMARY_WHITE : 'none'; }};
  background-image: ${(props) => { return props.login ? edLogo : edLogoWhite; }};
  background-position: ${(props) => { return props.login ? 'left center' : '7px 20px'; }};
  background-repeat: no-repeat;
  ::before { 
    content: 'Event Dynamic'
  }
`;
