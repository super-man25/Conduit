import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { formatDate } from '_helpers';
import {
  MultiSelect,
  Dropdown,
  TextInput,
  Toggle,
  Flex,
  Text,
} from '_components';
import { selectors as buyerTypeSelectors } from '_state/buyerType';
import { selectors as priceScaleSelectors } from '_state/priceScale';
import { selectors as eventListSelectors } from '_state/eventList';
import { actions as alertActions } from '_state/alert';
import { actions as priceRuleActions } from '_state/priceRule';
import { colors } from '_constants';
import { priceRuleService } from '_services';

const StyledPricingRulesBulkUpdate = styled.div`
  height: ${({ open, contentHeight }) => (open ? contentHeight : 0)}px;
  padding: ${({ open }) => (open ? '25px' : '0 25px')};
  margin-bottom: ${({ open }) => (open ? 25 : 0)}px;
  width: 100%;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: all 0.1s ease-out;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid ${colors.lightGray};
  border-radius: 6px;
`;

const Row = styled.div`
  display: flex;
  align-items: stretch;

  & + & {
    margin-top: 25px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: 0;
  justify-content: center;
  font-weight: ${({ heading }) => heading && 'bold'};

  & + & {
    margin-left: 25px;
  }
`;

export const PricingRulesBulkUpdate = ({
  open,
  setBulkUpdateInProgress,
  cancelBulkUpdate,
  bulkUpdateRowIds,
}) => {
  const [contentHeight, setContentHeight] = useState();
  const [bulkUpdate, setBulkUpdate] = useState({});

  const ref = useRef();

  const buyerTypes = useSelector(buyerTypeSelectors.selectAllBuyerTypes);
  const priceScales = useSelector(priceScaleSelectors.selectAllPriceScales);
  const events = useSelector(eventListSelectors.selectEventList);
  const dispatch = useDispatch();
  const successAlert = (message) => dispatch(alertActions.success(message));
  const errorAlert = (message) => dispatch(alertActions.error(message));
  const fetchPriceRules = () => dispatch(priceRuleActions.fetchPriceRules());

  const handleChange = ({ property, value }) => {
    const newState = { ...bulkUpdate };
    newState[property] = value;
    setBulkUpdate(newState);
    setContentHeight(ref.current.scrollHeight + 50);
  };

  const handleCancel = () => {
    setBulkUpdate({});
    cancelBulkUpdate();
  };

  const handleSave = () => {
    priceRuleService
      .bulkUpdate({
        ids: bulkUpdateRowIds,
        ...bulkUpdate,
      })
      .then(() => {
        successAlert('Success!');
        fetchPriceRules();
      })
      .catch(({ code }) =>
        code === 409
          ? errorAlert('Unable To Save Conflicting Rules')
          : errorAlert('Failed To Save Rules')
      );
    setBulkUpdateInProgress(false);
  };

  return (
    <StyledPricingRulesBulkUpdate
      ref={ref}
      open={open}
      contentHeight={contentHeight}
    >
      {open && (
        <>
          <Row>
            <Column heading>Buyer Types</Column>
            <Column heading>Price Scales</Column>
            <Column heading>Mirrors</Column>
            <Column heading>% Change</Column>
            <Column heading>$ Change</Column>
            <Column heading>Events</Column>
            <Column heading>Round</Column>
            <Column heading>Price Floor</Column>
            <Column heading>Price Ceiling</Column>
            <Column heading>Enabled</Column>
            {/* empty heading for save/cancel buttons */}
            <Column heading></Column>{' '}
          </Row>
          <Row>
            <Column>
              <MultiSelect
                options={buyerTypes.map((buyerType) => ({
                  id: buyerType.id,
                  label: buyerType.publicDescription,
                }))}
                handleChange={(selectedOptions) =>
                  handleChange({
                    property: 'externalBuyerTypeIds',
                    value: selectedOptions.map(({ id }) => id),
                  })
                }
              />
            </Column>
            <Column>
              <MultiSelect
                options={priceScales.map((priceScale) => ({
                  id: priceScale.id,
                  label: priceScale.name,
                }))}
                handleChange={(selectedOptions) =>
                  handleChange({
                    property: 'priceScaleIds',
                    value: selectedOptions.map(({ id }) => id),
                  })
                }
              />
            </Column>
            <Column>
              <Dropdown
                options={priceScales.map((priceScale) => ({
                  id: priceScale.id,
                  label: priceScale.name,
                }))}
                defaultOption={{ label: 'Select...' }}
                handleChange={(selectedOption) =>
                  handleChange({
                    property: 'mirrorPriceScaleId',
                    value: selectedOption.id,
                  })
                }
                plain
              />
            </Column>
            <Column>
              <TextInput
                type="number"
                handleChange={(value) =>
                  handleChange({
                    property: 'percent',
                    value: parseFloat(value),
                  })
                }
                plain
              />
            </Column>
            <Column>
              <TextInput
                type="number"
                handleChange={(value) =>
                  handleChange({
                    property: 'constant',
                    value: parseFloat(value),
                  })
                }
                plain
              />
            </Column>
            <Column>
              <MultiSelect
                options={events.map((event) => ({
                  id: event.id,
                  label: `${formatDate(
                    event.timestamp,
                    'M/d/yyyy',
                    event.timeZone
                  )} - ${event.name}`,
                }))}
                handleChange={(selectedOptions) =>
                  handleChange({
                    property: 'eventIds',
                    value: selectedOptions.map(({ id }) => id),
                  })
                }
              />
            </Column>
            <Column>
              <Dropdown
                options={[
                  { id: 'Ceil', label: 'Up' },
                  { id: 'Floor', label: 'Down' },
                  { id: 'Round', label: 'Nearest Dollar' },
                  { id: 'None', label: 'No Rounding' },
                ]}
                defaultOption={{ label: 'Select...' }}
                handleChange={(selectedOption) =>
                  handleChange({ property: 'round', value: selectedOption.id })
                }
                plain
              />
            </Column>
            <Column>
              <TextInput
                type="number"
                handleChange={(value) =>
                  handleChange({
                    property: 'priceFloor',
                    value: parseFloat(value),
                  })
                }
                plain
              />
            </Column>
            <Column>
              <TextInput
                type="number"
                handleChange={(value) =>
                  handleChange({
                    property: 'priceCeiling',
                    value: parseFloat(value),
                  })
                }
                plain
              />
            </Column>
            <Column>
              <Toggle
                handleChange={(value) =>
                  handleChange({ property: 'isActive', value })
                }
              />
            </Column>
            <Column>
              <Flex align="center" justify="flex-end">
                <Text
                  size={14}
                  color={colors.blue}
                  onClick={handleSave}
                  style={{ cursor: 'pointer' }}
                  weight="heavy"
                  marginRight="15px"
                >
                  Save
                </Text>
                <Text
                  size={14}
                  weight="heavy"
                  color={colors.red}
                  onClick={handleCancel}
                  style={{ cursor: 'pointer' }}
                >
                  Cancel
                </Text>
              </Flex>
            </Column>
          </Row>
        </>
      )}
    </StyledPricingRulesBulkUpdate>
  );
};
