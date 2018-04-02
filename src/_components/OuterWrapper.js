import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const OuterWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  margin: 0;
  padding:0;
  background: ${cssConstants.PRIMARY_LIGHTEST_GRAY};

`;