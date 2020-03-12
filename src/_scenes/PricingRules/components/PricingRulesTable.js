import React, { useEffect, memo, useCallback, useState } from 'react';
import { Table, Column } from 'react-virtualized';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  selectors as priceRuleSelectors,
  actions as priceRuleActions,
} from '_state/priceRule';
import {
  actions as eventListActions,
  selectors as eventListSelectors,
} from '_state/eventList';
import { selectors as buyerTypeSelectors } from '_state/buyerType';
import {
  selectors as priceScaleSelectors,
  actions as priceScaleActions,
} from '_state/priceScale';
import {
  actions as eventCategoryActions,
  selectors as eventCategorySelectors,
} from '_state/eventCategory';
import { selectors as seasonSelectors } from '_state/season';
import { Loader, Flex, Text } from '_components';
import { rowRenderer } from './rowRenderer';
import { pricingRulesTableColumns } from './pricingRulesTableColumns';
import { headerRenderer } from './headerRenderer';
import { colors } from '_constants';

const StyledPricingRulesTable = styled.div`
  flex: 1;
  padding: 25px;
  background-color: white;
  border: 1px solid ${colors.lightGray};
  border-radius: 6px;
  width: 100%;
`;

const TableContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const roundOptions = [
  { id: 'Ceil', name: 'Up' },
  { id: 'Floor', name: 'Down' },
  { id: 'Round', name: 'Nearest Dollar' },
  { id: 'None', name: 'No Rounding' },
];

const NoTableRowsText = ({ children }) => (
  <Flex justify="center" align="center" height="100%">
    <Text size={16}>{children}</Text>
  </Flex>
);

export const PricingRulesTable = memo(
  ({
    bulkUpdateHeight,
    selectForBulkUpdate,
    deselectForBulkUpdate,
    bulkUpdateInProgress,
  }) => {
    const [tableWidth, setTableWidth] = useState(0);
    const [tableHeight, setTableHeight] = useState(0);

    const ref = useCallback((node) => {
      if (node !== null) {
        setTableWidth(node.scrollWidth);
        setTableHeight(node.scrollHeight);
      }
    }, []);
    const activeSeasonId = useSelector(seasonSelectors.selectActiveSeasonId);
    const rows = useSelector(priceRuleSelectors.selectAllPriceRuleRows);
    const events = useSelector(eventListSelectors.selectEventList);
    const buyerTypes = useSelector(buyerTypeSelectors.selectAllBuyerTypes);
    const priceScales = useSelector(priceScaleSelectors.selectAllPriceScales);
    const buyerTypesLoading = useSelector(buyerTypeSelectors.selectIsLoading);
    const priceScalesLoading = useSelector(priceScaleSelectors.selectIsLoading);
    const priceRulesLoading = useSelector(priceRuleSelectors.selectIsLoading);
    const eventsGroupedByCategoryId = useSelector(
      eventListSelectors.selectGroupedByCategoryId
    );
    const eventCategories = useSelector(
      eventCategorySelectors.selectAllEventCategories
    );
    const eventCategoriesLoading = useSelector(
      eventCategorySelectors.selectIsLoading
    );
    const eventsLoading = useSelector(eventListSelectors.selectIsLoading);
    const dispatch = useDispatch();
    const rowCount = buyerTypes.length > 0 ? rows.length : 0;

    useEffect(() => {
      if (!activeSeasonId) return;
      const fetchPriceScales = () =>
        dispatch(priceScaleActions.fetchPriceScales());
      const fetchPriceRules = () =>
        dispatch(priceRuleActions.fetchPriceRules());
      const fetchEventList = () =>
        dispatch(eventListActions.fetchEventList({ seasonId: activeSeasonId }));
      const fetchEventCategories = () =>
        dispatch(eventCategoryActions.fetchEventCategories());
      fetchPriceScales();
      fetchPriceRules();
      fetchEventList();
      fetchEventCategories();

      const reset = () => dispatch(priceRuleActions.resetPriceRules());
      return reset;
    }, [dispatch, activeSeasonId]);

    if (
      buyerTypesLoading ||
      priceScalesLoading ||
      priceRulesLoading ||
      eventCategoriesLoading ||
      eventsLoading
    ) {
      return <Loader centered />;
    }

    return (
      <StyledPricingRulesTable>
        <TableContainer ref={ref}>
          <Table
            height={tableHeight}
            width={tableWidth}
            headerHeight={45}
            rowHeight={60}
            rowCount={rowCount}
            rowGetter={({ index }) => rows[index]}
            headerRowRenderer={headerRenderer}
            rowRenderer={rowRenderer}
            noRowsRenderer={() => (
              <NoTableRowsText>
                No Pricing Rules Available To Display
              </NoTableRowsText>
            )}
          >
            {pricingRulesTableColumns.map((column) => (
              <Column
                key={column.label}
                {...column}
                columnData={{
                  ...column.columnData,
                  label: column.label,
                  rows,
                  events,
                  roundOptions,
                  priceScales,
                  buyerTypes,
                  eventCategories,
                  eventsGroupedByCategoryId,
                  selectForBulkUpdate,
                  deselectForBulkUpdate,
                  bulkUpdateInProgress,
                }}
              />
            ))}
          </Table>
        </TableContainer>
      </StyledPricingRulesTable>
    );
  }
);
