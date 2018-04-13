import styled from 'styled-components';
import { cssConstants } from '../_constants';

const LoginFooterDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 27%;
  height: 6%;
  margin: 0;
  padding: 0;
  padding-top: 1.7%;
  padding-left: 8%;
  padding-right: 8%;
  font-size: 10px;
  font-family: 'Roboto';
  line-height: 130%;
  background: ${cssConstants.PRIMARY_EVEN_LIGHTER_GRAY};
`;

export default LoginFooterDiv;
