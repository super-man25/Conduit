import styled from 'styled-components';
import { cssConstants } from '_constants';

const panelBorder = `1px solid ${cssConstants.PRIMARY_LIGHT_GRAY}`;

export const Panel = styled.div`
  background-color: ${cssConstants.PRIMARY_WHITE};
`;

export const PanelHeader = styled.header`
  border: ${panelBorder};
  border-radius: 6px 6px 0 0;
  padding: 12px 24px;
`;

export const PanelContent = styled.section`
  border: ${panelBorder};
  border-top: none;
  border-radius: 0 0 6px 6px;
  padding: 24px;
`;
