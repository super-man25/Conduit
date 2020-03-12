// @flow
import type { ComponentType } from 'react';
import styled from 'styled-components';

import { colors } from '_constants';

const panelBorder = `1px solid ${colors.lightGray}`;

export const Panel: ComponentType<{}> = styled.div`
  background-color: ${colors.white};
  width: 100%;

  & + & {
    margin-top: 25px;
  }
`;

export const PanelHeader: ComponentType<{}> = styled.header`
  border: ${panelBorder};
  border-radius: 6px 6px 0 0;
  padding: 15px 25px;
`;

export const PanelContent: ComponentType<{}> = styled.section`
  border: ${panelBorder};
  border-top: none;
  padding: 25px;
  position: relative;

  & + & {
    padding-top: 25px;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
  }
`;

Panel.displayName = 'Panel';
PanelHeader.displayName = 'PanelHeader';
PanelContent.displayName = 'PanelContent';
