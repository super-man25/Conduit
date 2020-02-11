// @flow
import React, { useEffect } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { actions as teamStatActions } from '_state/teamStat';
import { actions as clientActions } from '_state/client';
import {
  FullContent,
  PrimaryContent,
  SecuredRoute,
  SiteHeader,
} from '_components';
import { Overview } from './Overview';
import { Sidebar } from './components/Sidebar';
import EventInventory from './Inventory';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const authState = useSelector(({ auth }) => auth);

  useEffect(() => {
    const fetchTeamStats = () => dispatch(teamStatActions.fetch());
    const fetchIntegrations = () => dispatch(clientActions.fetchIntegrations());
    fetchTeamStats();
    fetchIntegrations();
  }, [dispatch]);

  const isAuthorized = !!authState.model;

  return (
    <>
      <SiteHeader />
      <FullContent>
        <Sidebar />
        <PrimaryContent>
          <Switch>
            <SecuredRoute
              path="/season"
              authorized={isAuthorized}
              component={Overview}
              componentProps={{ isSeason: true }}
            />
            <SecuredRoute
              path="/event/:id/inventory"
              authorized={isAuthorized}
              component={EventInventory}
              componentProps={{ isEvent: true }}
            />
            <SecuredRoute
              path="/event/:id"
              authorized={isAuthorized}
              component={Overview}
              componentProps={{ isEvent: true }}
            />
            <Redirect to="/season" />
          </Switch>
        </PrimaryContent>
      </FullContent>
    </>
  );
};

export default withRouter(Dashboard);
