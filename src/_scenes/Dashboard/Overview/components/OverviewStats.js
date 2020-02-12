import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
  isAfter,
  subDays,
  isBefore,
  isFuture,
  format,
  isSameYear,
} from 'date-fns';

import { cssConstants, mobileBreakpoint } from '_constants';
import { formatUSD, formatNumber } from '_helpers/string-utils';
import { selectors as eventSelectors } from '_state/event';
import { getEventStats } from '_state/eventStat/selectors';
import { getSeasonStats } from '_state/seasonStat/selectors';
import { convertToTimeZone } from 'date-fns-timezone';

const StatsRow = styled.div`
  display: flex;
  margin-bottom: 25px;
  flex-wrap: wrap;
`;

const StatContainer = styled.div`
  padding: 15px;
  width: calc((100% - 45px) / 4);
  display: flex;
  flex-direction: column;

  ${({ highlighted }) =>
    highlighted &&
    `
    border-radius: 10px;
    background-color: ${cssConstants.PRIMARY_LIGHTER_GRAY};
  `}

  & + & {
    margin-left: 15px;
  }

  @media (max-width: ${mobileBreakpoint}px) {
    & {
      width: calc((100% - 15px) / 2);
    }

    &:nth-child(even) {
      margin-left: 15px;
    }

    &:nth-child(odd) {
      margin-left: 0;
    }
  }
`;

const OverallStatLabel = styled.span`
  font-size: 14px;
  font-weight: bold;

  @media (max-width: ${mobileBreakpoint}px) {
    font-size: 12px;
  }
`;

const OverallStatValue = styled.span`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;

  @media (max-width: ${mobileBreakpoint}px) {
    font-size: 16px;
  }
`;

const PeriodicStatLabel = styled.span`
  font-size: 14px;
  margin-bottom: 15px;

  @media (max-width: ${mobileBreakpoint}px) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

const PeriodicStatRevenue = styled.span`
  font-size: 22px;
  margin-bottom: 5px;
  display: flex;
  align-items: flex-end;

  @media (max-width: ${mobileBreakpoint}px) {
    font-size: 16px;
  }
`;

const PeriodicStatInventory = styled.span`
  font-size: 16px;
  display: flex;
  align-items: flex-end;

  @media (max-width: ${mobileBreakpoint}px) {
    font-size: 14px;
  }
`;

const Value = styled.div``;

const Change = styled.div`
  font-size: 16px;
  margin-left: 10px;
  font-weight: bold;
  position: relative;

  ${({ isPositive }) =>
    isPositive
      ? `
    color: ${cssConstants.SECONDARY_GREEN};

    &:after { content: '⬆︎'; }
  `
      : `
    color: ${cssConstants.PRIMARY_RED};
    &:after { content: '⬇︎';}
  `}

  &:after {
    position: absolute;
    left: 100%;
    bottom: 3px;
    font-size: 10px;
    margin-left: 1px;
  }

  @media (max-width: ${mobileBreakpoint}px) {
    font-size: 14px;
  }
`;

export const OverviewStats = ({ isSeason, isEvent }) => {
  const event = useSelector(eventSelectors.selectEvent);
  const eventStats = useSelector(getEventStats);
  const seasonStats = useSelector(getSeasonStats);
  const season = [...seasonStats].sort((a, b) =>
    isAfter(new Date(a.timestamp), new Date(b.timestamp)) ? -1 : 1
  )[0] || {
    revenue: 0,
  };

  const totalRevenue = isSeason ? season.revenue : event.revenue;
  const soldInventory = isSeason
    ? season.soldInventory * -1
    : event.soldInventory;
  const sellThrough = isEvent && event.soldInventory / event.totalInventory;
  const revenuePerSeat = isSeason
    ? season.revenue / season.inventory
    : event.revenue / event.totalInventory;
  const averageTicketPrice = isSeason
    ? season.revenue / Math.abs(season.soldInventory)
    : event.revenue / event.soldInventory;

  const today = new Date();

  const isFutureEvent =
    isEvent &&
    isFuture(convertToTimeZone(event.timestamp, { timeZone: event.timeZone }));
  const isSeasonInProgress =
    isSeason && isSameYear(new Date(season.timestamp), today);

  const todaySeasonStats =
    seasonStats.filter((seasonStat) =>
      isAfter(seasonStat.timestamp, subDays(today, 1))
    ) || [];
  const todayEventStats =
    eventStats.filter((eventStat) =>
      isAfter(eventStat.timestamp, subDays(today, 1))
    ) || [];
  const yesterdaySeasonStats =
    seasonStats.filter(
      (seasonStat) =>
        isAfter(seasonStat.timestamp, subDays(today, 2)) &&
        isBefore(seasonStat.timestamp, subDays(today, 1))
    ) || [];
  const yesterdayEventStats =
    eventStats.filter(
      (eventStat) =>
        isAfter(eventStat.timestamp, subDays(today, 2)) &&
        isBefore(eventStat.timestamp, subDays(today, 1))
    ) || [];
  const twoDaysAgoSeasonStats =
    seasonStats.filter(
      (seasonStat) =>
        isAfter(seasonStat.timestamp, subDays(today, 3)) &&
        isBefore(seasonStat.timestamp, subDays(today, 2))
    ) || [];
  const twoDaysAgoEventStats =
    eventStats.filter(
      (eventStat) =>
        isAfter(eventStat.timestamp, subDays(today, 3)) &&
        isBefore(eventStat.timestamp, subDays(today, 2))
    ) || [];

  const todayRevenueStat = isSeason
    ? todaySeasonStats.reduce(
        (total, seasonStat) => total + seasonStat.periodicRevenue,
        0
      )
    : todayEventStats.reduce(
        (total, eventStat) => total + eventStat.periodicRevenue,
        0
      );
  const todayTicketStat = isSeason
    ? todaySeasonStats.reduce(
        (total, seasonStat) => total + Math.abs(seasonStat.periodicInventory),
        0
      )
    : todayEventStats.reduce(
        (total, eventStat) => total + Math.abs(eventStat.periodicInventory),
        0
      );
  const yesterdayRevenueStat = isSeason
    ? yesterdaySeasonStats.reduce(
        (total, seasonStat) => total + seasonStat.periodicRevenue,
        0
      )
    : yesterdayEventStats.reduce(
        (total, eventStat) => total + eventStat.periodicRevenue,
        0
      );
  const yesterdayTicketStat = isSeason
    ? yesterdaySeasonStats.reduce(
        (total, seasonStat) => total + Math.abs(seasonStat.periodicInventory),
        0
      )
    : yesterdayEventStats.reduce(
        (total, eventStat) => total + Math.abs(eventStat.periodicInventory),
        0
      );
  const twoDaysAgoRevenueStat = isSeason
    ? twoDaysAgoSeasonStats.reduce(
        (total, seasonStat) => total + seasonStat.periodicRevenue,
        0
      )
    : twoDaysAgoEventStats.reduce(
        (total, eventStat) => total + eventStat.periodicRevenue,
        0
      );
  const twoDaysAgoTicketStat = isSeason
    ? twoDaysAgoSeasonStats.reduce(
        (total, seasonStat) => total + Math.abs(seasonStat.periodicInventory),
        0
      )
    : twoDaysAgoEventStats.reduce(
        (total, eventStat) => total + Math.abs(eventStat.periodicInventory),
        0
      );

  return (
    <div>
      <StatsRow>
        <StatContainer>
          <OverallStatValue>{formatUSD(totalRevenue)}</OverallStatValue>
          <OverallStatLabel>Total Revenue</OverallStatLabel>
        </StatContainer>
        <StatContainer>
          <OverallStatValue>{formatNumber(soldInventory)}</OverallStatValue>
          <OverallStatLabel>Total Tickets Sold</OverallStatLabel>
        </StatContainer>
        {isEvent && (
          <StatContainer>
            <OverallStatValue>
              {formatNumber(sellThrough.toFixed(2) * 100)}%
            </OverallStatValue>
            <OverallStatLabel>Sell-Through</OverallStatLabel>
          </StatContainer>
        )}
        {isSeasonInProgress || isFutureEvent ? (
          <StatContainer>
            <OverallStatValue>{formatUSD(averageTicketPrice)}</OverallStatValue>
            <OverallStatLabel>Average Ticket Price</OverallStatLabel>
          </StatContainer>
        ) : (
          <StatContainer>
            <OverallStatValue>{formatUSD(revenuePerSeat)}</OverallStatValue>
            <OverallStatLabel>Revenue Per Seat</OverallStatLabel>
          </StatContainer>
        )}
      </StatsRow>
      {(isSeason || isFutureEvent) && (
        <StatsRow>
          <StatContainer highlighted>
            <PeriodicStatLabel>
              <strong>Today</strong> {format(today, 'MMM DD')}
            </PeriodicStatLabel>
            <PeriodicStatRevenue>
              <Value>{formatUSD(todayRevenueStat)}</Value>
              <Change isPositive={todayRevenueStat - yesterdayRevenueStat >= 0}>
                {formatUSD(Math.abs(todayRevenueStat - yesterdayRevenueStat))}
              </Change>
            </PeriodicStatRevenue>
            <PeriodicStatInventory>
              <Value>{formatNumber(todayTicketStat)} Tickets</Value>
              <Change isPositive={todayTicketStat - yesterdayTicketStat >= 0}>
                {formatNumber(Math.abs(todayTicketStat - yesterdayTicketStat))}
              </Change>
            </PeriodicStatInventory>
          </StatContainer>
          <StatContainer>
            <PeriodicStatLabel>
              <strong>Yesterday</strong> {format(subDays(today, 1), 'MMM DD')}
            </PeriodicStatLabel>
            <PeriodicStatRevenue>
              <Value>{formatUSD(yesterdayRevenueStat)}</Value>
              <Change
                isPositive={yesterdayRevenueStat - twoDaysAgoRevenueStat >= 0}
              >
                {formatUSD(
                  Math.abs(yesterdayRevenueStat - twoDaysAgoRevenueStat)
                )}
              </Change>
            </PeriodicStatRevenue>
            <PeriodicStatInventory>
              <Value>{formatNumber(yesterdayTicketStat)} Tickets</Value>
              <Change
                isPositive={yesterdayTicketStat - twoDaysAgoTicketStat >= 0}
              >
                {formatNumber(
                  Math.abs(yesterdayTicketStat - twoDaysAgoTicketStat)
                )}
              </Change>
            </PeriodicStatInventory>
          </StatContainer>
        </StatsRow>
      )}
    </div>
  );
};
