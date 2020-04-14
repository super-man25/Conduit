// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { colors } from '_constants';
import type { EDEvent } from '_models';
import {
  formatUSD,
  isPastEvent,
  finalEventScore,
  isMobileDevice,
  formatDate,
  formatNumber,
} from '_helpers';
import { selectors as eventListSelectors } from '_state/eventList';
import { actions as uiActions } from '_state/ui';
import { Flex } from '_components';
import { ScheduledJobStatus } from './ScheduledJobStatus';
import { EventScoreIcon } from './EventScoreIcon';

const StyledEventListItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 25px;
  border-bottom: 1px solid ${colors.lightGray};
  background-color: white;
  position: relative;
  cursor: pointer;
  transition: margin-bottom 0.2s ease-out;

  ${({ past }) =>
    past &&
    `
    background-color: ${colors.lightGray};
    border-color: ${colors.gray};
    color: ${colors.gray};
  `}

  ${({ active, progressBarHovered }) =>
    active &&
    `
      border: none;
      background-color: ${colors.blue};
      color: white;
      margin-bottom: ${progressBarHovered ? '15px' : '10px'};
    `}
`;

const EventListItemRow = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  justify-content: space-between;

  & + & {
    margin-top: 15px;
  }
`;

const DateContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid black;
  border-radius: 3px;
  text-align: center;
  margin-right: 10px;

  ${({ past }) =>
    past &&
    `
    border-color: ${colors.gray};
  `}

  ${({ active }) =>
    active &&
    `
    border-color: white;
  `}
`;

const Month = styled.div`
  background-color: black;
  color: white;
  padding: 0 5px;
  font-weight: bold;

  ${({ past }) =>
    past &&
    `
    background-color: ${colors.gray};
  `}

  ${({ active }) =>
    active &&
    `
    background-color: white;
    color: ${colors.blue};
  `}
`;

const Day = styled.div`
  padding: 1px 3px;
`;

const EventTitleContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const EventTitle = styled.div`
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
  font-size: 16px;
  margin-right: 5px;
`;

const EventDayOfWeek = styled.div`
  font-size: 12px;
  margin-right: 3px;
`;

const EventTime = styled.div`
  text-transform: lowercase;
  font-size: 12px;
`;

const EventDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & + & {
    margin-left: 15px;
  }
`;

const EventDetailValue = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const EventDetailLabel = styled.div`
  font-size: 14px;
`;

const InventoryProgressBar = styled.div`
  background-color: ${colors.neonBlue};
  height: 100%;
  width: 0;
  transition: width 0.3s ease-out 0.2s;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;

  &:after {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 5px;
    opacity: 0;
    font-size: 12px;
    height: 100%;
    display: flex;
    align-items: center;
    transition: opacity 0.2s;
  }

  ${({ active, percentage }) =>
    active &&
    `
    width: ${percentage}%;

    &:after {
      content: '${percentage}%';
      color: ${colors.darkBlue};
      ${
        percentage < 15
          ? `
        right: initial;
        left: calc(100% + 5px);
        color: white;
      `
          : ''
      }
    }
  `}
`;

const InventoryProgressBarContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  height: 0;
  width: 100%;
  transition: height 0.2s ease-out;
  background-color: ${colors.darkBlue};

  ${({ active }) =>
    active &&
    `
    border-bottom: 1px solid ${colors.lightGray};
    height: 10px;
  `}

  &:hover {
    height: 15px;
  }

  &:hover ${/* sc-selector */ InventoryProgressBar}:after {
    opacity: 1;
  }
`;

export const EventListItem = ({
  event,
  active,
  isAdmin,
}: {
  event: EDEvent,
  active: boolean,
  isAdmin: boolean,
}) => {
  const [progressBarHovered, setProgressBarHovered] = useState(false);

  const activeEventId = useSelector(eventListSelectors.selectActiveEventListId);
  const dispatch = useDispatch();
  const toggleSidebar = () => dispatch(uiActions.toggleSidebar());
  const history = useHistory();
  const past = isPastEvent(event);
  const soldInventoryPercentage = Math.round(
    (event.soldInventory / event.totalInventory) * 100
  );

  const handleProgressBarMouseEnter = () => setProgressBarHovered(true);
  const handleProgressBarMouseLeave = () => setProgressBarHovered(false);

  const handleClick = () => {
    if (isMobileDevice) toggleSidebar();

    if (event.id !== activeEventId) {
      history.push(`/event/${event.id}`);
    } else {
      history.push(`/season`);
    }
  };

  const calculateEventScore = (event: EDEvent) => {
    const { eventScore, eventScoreModifier, velocityFactor } = event.factors;
    if (eventScore === undefined) {
      return '--';
    }
    return finalEventScore(eventScore, velocityFactor, eventScoreModifier);
  };

  return (
    <>
      <StyledEventListItem
        onClick={handleClick}
        active={active}
        past={past}
        progressBarHovered={progressBarHovered}
      >
        <EventListItemRow>
          <DateContainer active={active} past={past}>
            <Month active={active} past={past}>
              {formatDate(event.timestamp, 'MMM', event.timeZone)}
            </Month>
            <Day>{formatDate(event.timestamp, 'dd', event.timeZone)}</Day>
          </DateContainer>
          <Flex direction="column" flex={1}>
            <EventTitleContainer past={past} title={event.name}>
              <EventTitle>{event.name}</EventTitle>
              <EventDayOfWeek>
                {formatDate(event.timestamp, 'EEEE,', event.timeZone)}
              </EventDayOfWeek>
              <EventTime>
                {formatDate(event.timestamp, 'h:mma', event.timeZone)}
              </EventTime>
            </EventTitleContainer>
            <ScheduledJobStatus
              past={past}
              scheduledJob={event.scheduledJob}
              timeZone={event.timeZone}
            />
          </Flex>
        </EventListItemRow>
        <EventListItemRow>
          <EventDetail>
            <EventScoreIcon
              eventScore={calculateEventScore(event)}
              eventScoreTrend={event.factors.eventScoreTrend}
              past={past}
              active={active}
            />
            <EventDetailLabel>Event Score</EventDetailLabel>
          </EventDetail>
          <EventDetail>
            <EventDetailValue>
              {formatUSD(event.revenue, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </EventDetailValue>
            <EventDetailLabel>Revenue</EventDetailLabel>
          </EventDetail>
          <EventDetail>
            <EventDetailValue>
              {formatNumber(event.unsoldInventory)} /{' '}
              {formatNumber(event.soldInventory)}
            </EventDetailValue>
            <EventDetailLabel>Unsold / Sold</EventDetailLabel>
          </EventDetail>
        </EventListItemRow>
        <InventoryProgressBarContainer
          active={active}
          onMouseEnter={handleProgressBarMouseEnter}
          onMouseLeave={handleProgressBarMouseLeave}
        >
          <InventoryProgressBar
            active={active}
            percentage={soldInventoryPercentage}
          />
        </InventoryProgressBarContainer>
      </StyledEventListItem>
    </>
  );
};
