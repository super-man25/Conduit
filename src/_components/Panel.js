// @flow
import type { ComponentType } from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';

const panelBorder = `1px solid ${cssConstants.PRIMARY_LIGHT_GRAY}`;

export const Panel: ComponentType<{}> = styled.div`
  background-color: ${cssConstants.PRIMARY_WHITE};
`;

export const PanelHeader: ComponentType<{}> = styled.header`
  border: ${panelBorder};
  border-radius: 6px 6px 0 0;
  padding: 0 24px;
  height: 56px;
`;

export const PanelContent: ComponentType<{}> = styled.section`
  border: ${panelBorder};
  border-top: none;
  padding: 18px 24px 30px;

  & + ${() => PanelContent} {
    padding-top: 24px;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
    padding-bottom: 18px;
  }
`;

Panel.displayName = 'Panel';
PanelHeader.displayName = 'PanelHeader';
PanelContent.displayName = 'PanelContent';
