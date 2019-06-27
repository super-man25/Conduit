import styled from 'styled-components';
import { zIndexes } from '_constants';

export const Overlay = styled.div`
  background: #000;
  height: 100vh;
  opacity: 0.4;
  position: fixed;
  width: 100%;
  z-index: ${zIndexes.OVERLAY};
  top: ${(props) => props.top || 0};
  left: 0;
`;
