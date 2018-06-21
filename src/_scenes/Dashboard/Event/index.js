// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Loader, Flex } from '_components';

const EventRouteLoading = () => (
  <Flex height="100%" width="100%" justify="center" align="center">
    <Loader />
  </Flex>
);

const EventInventory = Loadable({
  loader: () => import('_scenes/Dashboard/Event/routes/EventInventory'),
  loading: EventRouteLoading
});

const EventOverview = Loadable({
  loader: () => import('_scenes/Dashboard/Event/routes/EventOverview'),
  loading: EventRouteLoading
});

export const Event = () => (
  <Switch>
    <Route path="/event/:id/inventory" component={EventInventory} />
    <Route path="/event/:id" component={EventOverview} />
    <Redirect to="/season" />
  </Switch>
);
