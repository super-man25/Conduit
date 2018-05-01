import styled from 'styled-components';
import { cssConstants } from '../_constants';

export const OuterWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  min-width: 1280px;
  max-width: 1600px;
  min-height: 800px;
  overflow: auto;
  margin: 0;
  padding: 0;
  background: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  font-family: Roboto;
`;
