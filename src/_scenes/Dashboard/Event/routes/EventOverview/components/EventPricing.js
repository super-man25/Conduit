// @flow

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import {
  AsyncButton,
  Flex,
  H4,
  Panel,
  PanelContent,
  PanelHeader,
  SecondaryButton,
  Text,
  Toggle
} from '_components';
import {
  actions as eventActions,
  selectors as eventSelectors
} from '_state/event';
import { actions as pricingPreviewActions } from '_state/pricingPreview';
import { selectors as seasonSelectors } from '_state/season';
import { PricingForm } from './PricingForm';
import { PricingPreview } from './PricingPreview';
import { PricingUpdateReason } from './PricingUpdateReason';
import type { EDEvent, PendingFactors } from '_models';
import type { EDPricingPreview } from '_models/pricingPreview';
import { isMobileDevice } from '_helpers';

const PaddedPanelContent = styled(PanelContent)`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  justify-content: space-around;
`;

const ButtonGroup = styled.div`
  display: flex;

  > *:not(:first-child) {
    margin-left: 8px;
  }
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
    event: { id, isBroadcast, springError },
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

  const [isEditing, setIsEditing] = useState(false);
  const [reasonType, setReasonType] = useState(null);
  const [reasonComments, setReasonComments] = useState(null);

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

  const handleTypeChange = (reason) => {
    if (reason === reasonType) {
      return setReasonType(null);
    }

    setReasonType(reason);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setReasonType(null);
    resetFactors();
    pricingPreviewParamsChanged(id);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    const { eventScoreModifier, springModifier } = pendingFactors;

    saveAdminModifiers({
      eventId: id,
      eventScoreModifier,
      springModifier,
      seasonId,
      reasonType,
      reasonComments
    });
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
        <Flex width="100%" direction={isMobileDevice ? 'column' : 'row'}>
          <PricingForm
            pricingError={pricingError}
            pricingPreview={pricingPreview}
            handleChange={handleChange}
            fetchAutomatedSpring={fetchAutomatedSpring}
            pendingFactors={pendingFactors}
            eventId={id}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
          <PricingPreview
            {...pricingPreview}
            springError={springError}
            pendingFactors={pendingFactors}
          />
        </Flex>
        {(isEditing || savingAdminModifiers) && (
          <Flex direction="column" padding="0 20px">
            <PricingUpdateReason
              reasonType={reasonType}
              handleTypeChange={handleTypeChange}
              reasonComments={reasonComments}
              handleCommentChange={setReasonComments}
            />
            <ButtonGroup>
              <>
                <AsyncButton
                  isLoading={savingAdminModifiers}
                  disabled={savingAdminModifiers}
                  onClick={handleSubmit}
                >
                  Save
                </AsyncButton>
                <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
              </>
            </ButtonGroup>
          </Flex>
        )}
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
