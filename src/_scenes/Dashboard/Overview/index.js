import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectors as seasonSelectors } from '_state/season';
import {
  actions as eventActions,
  selectors as eventSelectors,
} from '_state/event';
import { H4, PageWrapper, Center, CenteredLoader } from '_components';
import { OverviewCharts } from './components/OverviewCharts';
import { SeasonTicketIntegrations } from './components/SeasonTicketIntegrations';
import { OverviewStats } from './components/OverviewStats';
import { DashboardHeader } from '../components/DashboardHeader';
import { isPastEvent } from '_helpers';
import { EventPricing } from './components/EventPricing';
import { cssConstants } from '_constants';

const Heading = styled(H4)`
  margin: 0;
  padding: 0;
  font-weight: bold;
  letter-spacing: 0.9px;
`;

const InventoryLink = styled(Link)`
  display: inline-block;
  padding: 10px 15px;
  color: ${cssConstants.PRIMARY_BLUE};
  border: 2px solid ${cssConstants.PRIMARY_BLUE};
  border-radius: 5px;
  margin-bottom: 25px;
  font-weight: bold;
`;

export const Overview = ({ isSeason, isEvent, match }) => {
  const dispatch = useDispatch();
  const seasonLoading = useSelector(seasonSelectors.selectLoading);
  const eventLoading = useSelector(({ event }) => {
    if (isEvent && !event.event) return true;
    return event.loading;
  });
  const activeSeason = useSelector(seasonSelectors.selectActiveSeason);
  const isAdmin = useSelector(({ auth }) => auth.model.isAdmin);
  const event = useSelector(eventSelectors.selectEvent);
  const loading = seasonLoading || eventLoading;

  useEffect(() => {
    if (isEvent) {
      const { id } = match.params;
      const fetchEvent = (id) => dispatch(eventActions.fetchEvent(id));
      fetchEvent(id);
    }
  }, [dispatch, isEvent, match]);

  if (loading) {
    return (
      <PageWrapper style={{ position: 'relative' }}>
        <CenteredLoader />
      </PageWrapper>
    );
  }

  if (!activeSeason) {
    return (
      <PageWrapper style={{ position: 'relative' }}>
        <Center>
          <Heading>No Season Selected</Heading>
        </Center>
      </PageWrapper>
    );
  }

  return (
    <>
      <DashboardHeader isSeason={isSeason} isEvent={isEvent} />
      <OverviewStats isSeason={isSeason} isEvent={isEvent} />
      {isEvent && (
        <InventoryLink to={`/event/${event.id}/inventory`}>
          View Inventory
        </InventoryLink>
      )}
      <OverviewCharts isSeason={isSeason} isEvent={isEvent} />
      <SeasonTicketIntegrations id={activeSeason.id} />
      {isEvent && isAdmin && !isPastEvent(event) && <EventPricing />}
    </>
  );
};