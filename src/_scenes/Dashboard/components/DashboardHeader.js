import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { useSidebar } from '_hooks';
import { isMobileDevice, formatDate } from '_helpers';
import { selectors as seasonSelectors } from '_state/season';
import { selectors as eventSelectors } from '_state/event';
import { Icon, Breadcrumbs } from '_components';
import { cssConstants } from '_constants';
import EventWeather from './EventWeather';
import clockIcon from '_images/clock.svg';

const StyledDashboardHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 900;
`;

const StyledEventDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const DateContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  border: 2px solid black;
  border-radius: 3px;
  text-align: center;
  margin-right: 10px;
`;

const Month = styled.div`
  background-color: black;
  color: white;
  padding: 1px 3px;
`;

const Day = styled.div`
  color: black;
  padding: 1px 3px;
`;

const StyledEventTime = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3px;
`;

const ClockIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 5px;
`;

const EventTime = ({ event }) => (
  <StyledEventTime>
    <ClockIcon src={clockIcon} />
    {formatDate(event.timestamp, 'ha z', event.timeZone)}
  </StyledEventTime>
);

const EventDetails = ({ event }) => (
  <StyledEventDetails>
    <DateContainer>
      <Month>{formatDate(event.timestamp, 'MMM', event.timeZone)}</Month>
      <Day>{formatDate(event.timestamp, 'dd', event.timeZone)}</Day>
    </DateContainer>
    <div>
      <EventTime event={event} />
      <EventWeather />
    </div>
  </StyledEventDetails>
);

export const DashboardHeader = ({ isSeason, isEvent, isEventInventory }) => {
  const [isSidebarOpen, toggleSidebar] = useSidebar();
  const season = useSelector(seasonSelectors.selectActiveSeason);
  const event = useSelector(eventSelectors.selectEvent);

  const crumbs = isSeason
    ? [{ title: `Overview - ${season.name}`, path: '/season' }]
    : isEvent
    ? [
        { title: 'Season Dashboard', path: '/season' },
        { title: event.name, path: `/event/${event.id}` },
      ]
    : isEventInventory
    ? [
        { title: 'Season Dashboard', path: '/season' },
        { title: event.name, path: `/event/${event.id}` },
        { title: 'Inventory', path: `/event/${event.id}/inventory` },
      ]
    : [];

  return (
    <StyledDashboardHeader>
      <Title>
        {!isSidebarOpen && !isMobileDevice && (
          <Icon
            onClick={toggleSidebar}
            name="arrowRight"
            size={24}
            color={cssConstants.PRIMARY_BLUE}
          />
        )}
        <Breadcrumbs crumbs={crumbs} />
      </Title>
      {isEvent && <EventDetails event={event} />}
    </StyledDashboardHeader>
  );
};
