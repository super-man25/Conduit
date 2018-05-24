import { cssConstants } from '_constants';
import styled from 'styled-components';

export const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const PrimaryContent = styled.div`
  display: flex;
  background-color: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  overflow-y: scroll;
  flex: 1;
  padding: ${(props) => props.padding || 0};
  margin: ${(props) => props.margin || 0};
`;

export const FullContent = styled.div`
  display: flex;
  position: absolute;
  top: 5rem;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const SidebarContent = styled.div`
  height: calc(100% - 116px);
`;
