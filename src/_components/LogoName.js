import styled from 'styled-components';
import { cssConstants } from '_constants';
import edLogoImage from '_images/eventdynamiclogo.svg';

const edLogo = `url(${edLogoImage})`;

export const LogoName = styled.div`
  width: 300px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  float: left;
  margin-left: 28px;
  margin-top: 14px;
  padding-left: 55px;
  font-size: 24px;
  color: ${cssConstants.PRIMARY_WHITE};
  background: none;
  background-image: ${edLogo};
  background-position: 0px 0px;
  background-repeat: no-repeat;
  ::before {
    content: 'Event Dynamic';
  }
`;
