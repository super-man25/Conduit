import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const LeftNav = styled.div`
  position: relative;
  width: calc(19% - 41px);
  clear: left;
  float: left;
  height: calc(100% - 40px);
  margin: 0;
  padding: 20px;
  background: ${cssConstants.PRIMARY_WHITE};
  border-right: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
`;