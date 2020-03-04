import styled from 'styled-components';

import { colors } from '_constants';

export const MainContent = styled.div`
  position: relative;
  float: left;
  width: ${(props) =>
    props.leftNav
      ? 'calc(81% - 71px)'
      : props.sidebar
      ? 'calc(67.3% - 71px)'
      : 'calc(100% - 71px)'};
  height: calc(100% - 70px);
  margin: 0;
  padding: 35px;
  background: ${colors.lightGray};
`;
