// @flow

import styled from 'styled-components';
import React, { useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  Flex,
  H4,
  PanelContent,
  Text,
  Toggle
} from '_components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectors as eventSelectors,
  actions as eventActions
} from '_state/event';
import { selectors as seasonSelectors } from '_state/season';
import { actions as pricingPreviewActions } from '_state/pricingPreview';
import { PricingForm } from './PricingForm';
import { PricingPreview } from './PricingPreview';

import type { EDEvent, PendingFactors } from '_models';
import type { EDPricingPreview } from '_models/pricingPreview';

const UnpaddedPanelContent = styled(PanelContent)`
  padding: 0 !important;
`;

type Props = {
  event: EDEvent,
  togglingBroadcasting: boolean,
  setBroadcasting: Function,
  fetchPricingPreview: Function,
  pricingPreviewParamsChanged: Function,
  fetchAutomatedSpring: Function,
  saveAdminModifiers: Function,
  seasonId: number,
  pendingFactors: PendingFactors,
  pricingPreview: {
    record: EDPricingPreview,
    loading: boolean
  },
  handleModifierChange: Function,
  resetFactors: Function,
  pricingError: ?Error,
  savingAdminModifiers: boolean
};

export const EventPricingPresenter = (props: Props) => {
  const {
    event: {
      id,
      isBroadcast,
      eventScore,
      eventScoreModifier,
      spring,
      springModifier
    },
    togglingBroadcasting,
    setBroadcasting,
    fetchPricingPreview,
    pricingPreviewParamsChanged,
    fetchAutomatedSpring,
    saveAdminModifiers,
    seasonId,
    pendingFactors,
    handleModifierChange,
    resetFactors,
    pricingPreview: { record, loading },
    pricingError,
    savingAdminModifiers
  } = props;

  useEffect(() => {
    fetchPricingPreview(id);
  }, [fetchPricingPreview, id]);

  const handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    handleModifierChange(name, value);
    if (name !== 'eventScoreModifier') {
      pricingPreviewParamsChanged(id);
    }
  };

  const handleCancel = () => {
    resetFactors();
    pricingPreviewParamsChanged(id);
  };

  const handleSubmit = () => {
    const { eventScoreModifier, springModifier } = pendingFactors;

    saveAdminModifiers(id, eventScoreModifier, springModifier, seasonId);
  };

  const toggleIsBroadcasting = (e: Object) => {
    const { checked } = e.target;

    const verb = checked ? 'enable' : 'disable';
    const msg = `Are you sure you want to ${verb} pricing for this event?`;

    if (window.confirm(msg)) {
      setBroadcasting(id, checked);
    }
  };

  return (
    <Panel>
      <PanelHeader>
        <Flex height="100%" align="center" justify="space-between">
          <Flex>
            <H4 margin="0 2.5rem 0 0">Pricing</H4>
            <Toggle
              isChecked={isBroadcast}
              onChange={toggleIsBroadcasting}
              isDisabled={togglingBroadcasting}
              size="small"
              title={isBroadcast ? 'Disable pricing' : 'Enable pricing'}
            />
            {togglingBroadcasting && <Text marginLeft="1.5rem">Saving...</Text>}
          </Flex>
        </Flex>
      </PanelHeader>
      <UnpaddedPanelContent>
        <Flex>
          <Flex
            flex={1}
            direction="column"
            padding="20px"
            style={{ borderRight: '1px solid #D1D1D1' }}
          >
            <PricingForm
              pricingError={pricingError}
              onChange={handleChange}
              onCancel={handleCancel}
              fetchAutomatedSpring={fetchAutomatedSpring}
              onSubmit={handleSubmit}
              initialValues={{
                eventScore,
                eventScoreModifier,
                spring,
                springModifier
              }}
              pendingFactors={pendingFactors}
              eventId={id}
              submitting={savingAdminModifiers}
            />
          </Flex>
          <Flex flex={1} justify="center" padding="20px 0">
            <PricingPreview pricingPreview={record} loading={loading} />
          </Flex>
        </Flex>
      </UnpaddedPanelContent>
    </Panel>
  );
};

const mapStateToProps = createStructuredSelector({
  togglingBroadcasting: eventSelectors.selectEventTogglingBroadcasting,
  pendingFactors: eventSelectors.selectPendingFactors,
  pricingPreview: (state) => state.pricingPreview,
  pricingError: eventSelectors.selectPricingError,
  savingAdminModifiers: eventSelectors.selectSavingAdminModifiers,
  seasonId: seasonSelectors.selectActiveSeasonId
});

const mapDispatchToProps = {
  setBroadcasting: eventActions.setEventBroadcasting,
  saveAdminModifiers: eventActions.saveAdminModifiers,
  fetchAutomatedSpring: eventActions.fetchAutomatedSpringValue,
  fetchPricingPreview: pricingPreviewActions.fetch,
  pricingPreviewParamsChanged: pricingPreviewActions.paramsChanged,
  handleModifierChange: eventActions.handleModifierChange,
  resetFactors: eventActions.resetToInitialFactors
};

export const EventPricing = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPricingPresenter);
