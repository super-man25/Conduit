import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const Sidebar = styled.div`
  position: relative;
  top: 0px;
  bottom: 0px;
  width: calc(32.7%);
  height: 100%;
  clear: left;
  float: left;
  margin: 0;
  padding: 0;
  background: ${cssConstants.PRIMARY_WHITE};
  border-right: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  font-family: Roboto;
`;