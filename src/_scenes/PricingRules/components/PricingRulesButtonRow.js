import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Flex, Dropdown, PrimaryButton, SecondaryButton } from '_components';
import {
  selectors as seasonSelectors,
  actions as seasonActions,
} from '_state/season';
import {
  selectors as priceRuleSelectors,
  actions as priceRuleActions,
} from '_state/priceRule';
import { seasonService } from '_services';

const StyledPricingRulesButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  width: 100%;
`;

const SeasonDropdown = styled(Dropdown)`
  margin-top: 5px;
`;

export const PricingRulesButtonRow = ({
  bulkUpdateInProgress,
  toggleBulkUpdateInProgress,
  bulkUpdateRowCount,
}) => {
  const activeSeasonId = useSelector(seasonSelectors.selectActiveSeasonId);
  const seasons = useSelector(seasonSelectors.selectSeasons);
  const editingPriceRule = useSelector(
    priceRuleSelectors.selectEditingPriceRule
  );

  const dispatch = useDispatch();
  const createPriceRule = () => dispatch(priceRuleActions.createPriceRule());
  const setActiveSeasonId = (id) => dispatch(seasonActions.setActiveId(id));

  const handlePriceAllEvents = () =>
    seasonService.priceAllEvents(activeSeasonId);

  return (
    <StyledPricingRulesButtonRow>
      <Flex>
        <SeasonDropdown
          options={seasons.map((season) => ({
            id: season.id,
            label: season.name,
          }))}
          defaultOption={{
            id: seasons[0]?.id,
            label: seasons[0]?.name,
          }}
          onChange={(option) => setActiveSeasonId(option.id)}
        />
        <PrimaryButton
          onClick={toggleBulkUpdateInProgress}
          disabled={bulkUpdateRowCount < 1 || bulkUpdateInProgress}
          style={{
            marginLeft: '15px',
            cursor:
              bulkUpdateRowCount < 1 || bulkUpdateInProgress
                ? 'not-allowed'
                : 'pointer',
          }}
        >
          Bulk Update{bulkUpdateRowCount > 0 && ` (${bulkUpdateRowCount} Rows)`}
        </PrimaryButton>
      </Flex>
      <Flex>
        <SecondaryButton onClick={handlePriceAllEvents}>
          Price All Events
        </SecondaryButton>
        <PrimaryButton
          onClick={createPriceRule}
          disabled={!!editingPriceRule.id}
          style={{
            marginLeft: '15px',
            cursor: !!editingPriceRule.id ? 'not-allowed' : 'pointer',
          }}
        >
          New Rule
        </PrimaryButton>
      </Flex>
    </StyledPricingRulesButtonRow>
  );
};
