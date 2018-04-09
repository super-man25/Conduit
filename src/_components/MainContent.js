import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const MainContent = styled.div`
  position: relative;
  float: left;
  width: calc(81% - 70px);
  height: 100%;
  margin: 0;
  padding: 35px;
  background: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  font-family: Roboto;
`;