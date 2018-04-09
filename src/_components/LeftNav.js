import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const LeftNav = styled.div`
  width: calc(19% - 41px);
  clear: left;
  float: left;
  height: 100%;
  margin: 0;
  padding: 20px;
  background: ${cssConstants.PRIMARY_WHITE};
  border-right: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  font-family: Roboto;
`;