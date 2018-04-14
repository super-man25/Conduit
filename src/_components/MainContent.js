import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const MainContent = styled.div`
  position: relative;
  float: left;
  width: ${(props) => {
    if (props.leftNav) {
      return 'calc(81% - 71px)';
    } else if (props.sidebar) {
      return 'calc(67.3% - 71px)';
    } return 'calc(100% - 71px)';
  }};
  height: calc(100% - 70px);
  margin: 0;
  padding: 35px;
  background: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
`;
