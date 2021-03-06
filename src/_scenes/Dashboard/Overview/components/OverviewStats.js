import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import {
  isAfter,
  subDays,
  isFuture,
  format,
  isSameYear,
  isSameDay,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { mobileBreakpoint, colors } from '_constants';
import { formatUSD, formatNumber } from '_helpers/string-utils';
import { selectors as eventSelectors } from '_state/event';
import { getEventStatState } from '_state/eventStat/selectors';
import { getSeasonStatState } from '_state/seasonStat/selectors';

const StyledOverviewStats = styled.div`
  width: 100%;
`;

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
    background-color: ${colors.lightGray};
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
    color: ${colors.green};

    &:after { content: '⬆︎'; }
  `
      : `
    color: ${colors.red};
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
  const { eventStats, eventStatsMeta } = useSelector(getEventStatState);
  const { seasonStats, seasonStatsMeta } = useSelector(getSeasonStatState);
  const season =
    [...seasonStats].sort((a, b) =>
      isAfter(new Date(a.timestamp), new Date(b.timestamp)) ? -1 : 1
    )[0] || {};

  const totalRevenue = isSeason ? season.revenue : event.revenue;
  const soldInventory = isSeason
    ? Math.abs(season.soldInventory)
    : event.soldInventory;
  const sellThrough = isEvent && event.soldInventory / event.totalInventory;
  const revenuePerSeat = isSeason
    ? season.revenue / (season.inventory + Math.abs(season.soldInventory))
    : event.revenue / event.totalInventory;
  const averageTicketPrice = isSeason
    ? season.revenue / Math.abs(season.soldInventory)
    : event.revenue / event.soldInventory;

  const today = new Date();

  const isFutureEvent =
    isEvent && isFuture(utcToZonedTime(event.timestamp, event.timeZone));
  const isSeasonInProgress =
    isSeason && isSameYear(new Date(season.timestamp), today);

  const todaySeasonStats =
    seasonStats.filter((seasonStat) =>
      isSameDay(
        utcToZonedTime(seasonStat.timestamp, seasonStatsMeta.timeZone),
        today
      )
    ) || [];
  const todayEventStats =
    eventStats.filter((eventStat) =>
      isSameDay(
        utcToZonedTime(eventStat.timestamp, eventStatsMeta.timeZone),
        today
      )
    ) || [];
  const yesterdaySeasonStats =
    seasonStats.filter((seasonStat) =>
      isSameDay(
        utcToZonedTime(seasonStat.timestamp, seasonStatsMeta.timeZone),
        subDays(today, 1)
      )
    ) || [];
  const yesterdayEventStats =
    eventStats.filter((eventStat) =>
      isSameDay(
        utcToZonedTime(eventStat.timestamp, eventStatsMeta.timeZone),
        subDays(today, 1)
      )
    ) || [];
  const twoDaysAgoSeasonStats =
    seasonStats.filter((seasonStat) =>
      isSameDay(
        utcToZonedTime(seasonStat.timestamp, seasonStatsMeta.timeZone),
        subDays(today, 2)
      )
    ) || [];
  const twoDaysAgoEventStats =
    eventStats.filter((eventStat) =>
      isSameDay(
        utcToZonedTime(eventStat.timestamp, eventStatsMeta.timeZone),
        subDays(today, 2)
      )
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
    <StyledOverviewStats>
      <StatsRow>
        <StatContainer>
          <OverallStatValue>
            {formatUSD(totalRevenue, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </OverallStatValue>
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
            <OverallStatValue>
              {formatUSD(revenuePerSeat, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </OverallStatValue>
            <OverallStatLabel>Revenue Per Seat</OverallStatLabel>
          </StatContainer>
        )}
      </StatsRow>
      {(isSeasonInProgress || isFutureEvent) && (
        <StatsRow>
          <StatContainer highlighted>
            <PeriodicStatLabel>
              <strong>Today</strong> {format(today, 'MMM dd')}
            </PeriodicStatLabel>
            <PeriodicStatRevenue>
              <Value>
                {formatUSD(todayRevenueStat, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Value>
              <Change isPositive={todayRevenueStat - yesterdayRevenueStat >= 0}>
                {formatUSD(Math.abs(todayRevenueStat - yesterdayRevenueStat), {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Change>
            </PeriodicStatRevenue>
            <PeriodicStatInventory>
              <Value>{formatNumber(todayTicketStat)} Tickets</Value>
              <Change isPositive={todayTicketStat - yesterdayTicketStat >= 0}>
                {formatNumber(Math.abs(todayTicketStat - yesterdayTicketStat), {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Change>
            </PeriodicStatInventory>
          </StatContainer>
          <StatContainer>
            <PeriodicStatLabel>
              <strong>Yesterday</strong> {format(subDays(today, 1), 'MMM dd')}
            </PeriodicStatLabel>
            <PeriodicStatRevenue>
              <Value>
                {formatUSD(yesterdayRevenueStat, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Value>
              <Change
                isPositive={yesterdayRevenueStat - twoDaysAgoRevenueStat >= 0}
              >
                {formatUSD(
                  Math.abs(yesterdayRevenueStat - twoDaysAgoRevenueStat),
                  {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }
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
    </StyledOverviewStats>
  );
};
