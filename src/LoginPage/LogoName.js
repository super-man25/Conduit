import styled from 'styled-components';
import { cssConstants } from '../_constants';
import edlogoImage from '../_images/edlogo.png';

const LogoName = styled.div`
  width: 300px;
  height: 40px;
  line-height: 50px;
  margin: 0;
  margin-bottom: 30px;
  padding: 0;
  padding-left: 60px;
  font-size: 22px;
  background: ${cssConstants.PRIMARY_WHITE};
  background-image: url(${edlogoImage});
  background-repeat: no-repeat;
  background-position: left center;
`;

export default LogoName;