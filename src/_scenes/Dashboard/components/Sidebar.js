import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { colors, mobileBreakpoint } from '_constants';
import { TeamOverview } from './TeamOverview';
import { EventList } from './EventList';
import { actions as uiActions } from '_state/ui';
import { useClickAway } from '_hooks';

const StyledSidebar = styled.div`
  width: 400px;
  visibility: visible;
  border-right: 1px solid ${colors.lightGray};
  transition: 0.1s ease-in-out transform;
  background-color: white;
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.collapsed &&
    `
    overflow: hidden;
    transform: translate3d(-100%, 0, 0);
    width: 0;
    max-width: 0;
    min-width: 0;
    overflow-x: hidden;
  `};

  @media (max-width: ${mobileBreakpoint}px) {
    position: absolute;
    z-index: 1;
    height: 100%;
  }
`;

const SidebarHeader = styled.div`
  background: ${colors.darkBlue};
`;

const SidebarContent = styled.div`
  flex-basis: 0;
  flex-grow: 1;
`;

export const Sidebar = () => {
  const ref = useRef();
  const sidebarIsOpen = useSelector(({ ui }) => ui.sidebarIsOpen);
  const dispatch = useDispatch();
  const toggleSidebar = () => dispatch(uiActions.toggleSidebar());

  const handleClickAway = () => {
    if (!sidebarIsOpen) return;
    toggleSidebar();
  };
  useClickAway({ ref, handleClickAway });

  return (
    <StyledSidebar ref={ref} collapsed={!sidebarIsOpen}>
      <SidebarHeader>
        <TeamOverview />
      </SidebarHeader>
      <SidebarContent>
        <EventList />
      </SidebarContent>
    </StyledSidebar>
  );
};
