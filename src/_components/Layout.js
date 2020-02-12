import { cssConstants, navigationHeight, containerPadding } from '_constants';
import styled from 'styled-components';

export const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const PrimaryContent = styled.div`
  background-color: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  overflow-y: ${(props) => props.overflowY || 'scroll'};
  flex: 1;
  padding: ${containerPadding}px;
  margin: ${(props) => props.margin || 0};
`;

export const FullContent = styled.div`
  display: flex;
  position: absolute;
  top: ${navigationHeight}px;
  bottom: 0;
  left: 0;
  right: 0;
`;
