// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import {
  Flex,
  H4,
  Panel,
  PanelContent,
  PanelHeader,
  Text,
  Toggle
} from '_components';
import { cssConstants } from '_constants';
import {
  actions as eventActions,
  selectors as eventSelectors
} from '_state/event';
import { actions as pricingPreviewActions } from '_state/pricingPreview';
import { selectors as seasonSelectors } from '_state/season';
import { PricingForm } from './PricingForm';
import { PricingPreview } from './PricingPreview';
import type { EDEvent, PendingFactors } from '_models';
import type { EDPricingPreview } from '_models/pricingPreview';

const PaddedPanelContent = styled(PanelContent)`
  display: flex;
  padding: 20px 0;
  justify-content: space-around;
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
    loading: boolean,
    error: ?Error
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
      springModifier,
      springError
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
    pricingPreview,
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
            <H4 margin="0 2.5rem 0 0" weight="bold">
              Pricing
            </H4>
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
      <PaddedPanelContent>
        <Flex
          direction="column"
          padding="0 20px"
          width="100%"
          style={{
            borderRight: `1px solid ${cssConstants.PRIMARY_LIGHT_GRAY}`
          }}
        >
          <PricingForm
            pricingError={pricingError}
            pricingPreview={pricingPreview}
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
        <Flex direction="column" padding="0 20px" width="100%">
          <PricingPreview {...pricingPreview} springError={springError} />
        </Flex>
      </PaddedPanelContent>
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
