// @flow
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Breadcrumbs, PrimaryContent, Layout } from '_components';
import { actions as buyerTypeActions } from '_state/buyerType';
import { selectors as seasonSelectors } from '_state/season';
import { PricingRulesTable } from './components/PricingRulesTable';
import { PricingRulesButtonRow } from './components/PricingRulesButtonRow';
import { PricingRulesBulkUpdate } from './components/PricingRulesBulkUpdate';

const pricingCrumb = [
  {
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    title: 'Pricing Rules',
    path: '/pricing',
  },
];

export const PricingRules = () => {
  const [bulkUpdateRowIds, setBulkUpdateRowIds] = useState(new Set());
  const [bulkUpdateInProgress, setBulkUpdateInProgress] = useState(false);
  const activeSeasonId = useSelector(seasonSelectors.selectActiveSeasonId);
  const dispatch = useDispatch();

  const selectForBulkUpdate = (id) => {
    const newState = new Set(bulkUpdateRowIds);
    newState.add(id);
    setBulkUpdateRowIds(newState);
  };
  const deselectForBulkUpdate = (id) => {
    const newState = new Set(bulkUpdateRowIds);
    newState.delete(id);
    setBulkUpdateRowIds(newState);
  };

  // TODO: Should this be in PricingRulesTable.js with similar calls?
  useEffect(() => {
    if (!activeSeasonId) return;
    const fetchBuyerTypes = () =>
      dispatch(buyerTypeActions.fetchBuyerTypes({ seasonId: activeSeasonId }));
    fetchBuyerTypes();
  }, [activeSeasonId, dispatch]);

  const toggleBulkUpdateInProgress = () =>
    setBulkUpdateInProgress(!bulkUpdateInProgress);
  const cancelBulkUpdate = () => setBulkUpdateInProgress(false);

  return (
    <Layout>
      <PrimaryContent>
        <Breadcrumbs crumbs={pricingCrumb} />
        <PricingRulesButtonRow
          bulkUpdateInProgress={bulkUpdateInProgress}
          toggleBulkUpdateInProgress={toggleBulkUpdateInProgress}
          bulkUpdateRowCount={bulkUpdateRowIds.size}
        />
        <PricingRulesBulkUpdate
          open={bulkUpdateInProgress}
          setBulkUpdateInProgress={setBulkUpdateInProgress}
          bulkUpdateRowIds={Array.from(bulkUpdateRowIds)}
          cancelBulkUpdate={cancelBulkUpdate}
        />
        <PricingRulesTable
          selectForBulkUpdate={selectForBulkUpdate}
          deselectForBulkUpdate={deselectForBulkUpdate}
          bulkUpdateInProgress={bulkUpdateInProgress}
        />
      </PrimaryContent>
    </Layout>
  );
};
