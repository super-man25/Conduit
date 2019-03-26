import React, { Fragment } from 'react';
import {
  Panel,
  PanelHeader,
  Flex,
  H4,
  PanelContent,
  Text,
  Toggle,
  Spacing
} from '_components';
import { EventPriceModifier } from './EventPriceModifier';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors, actions } from '_state/event';
import { EventPricingFactor } from './EventPricingFactor';

export function EventPricingPresenter(props) {
  const toggleIsBroadcasting = (e) => {
    const {
      setBroadcasting,
      event: { id }
    } = props;

    const { checked } = e.target;

    const verb = checked ? 'enable' : 'disable';
    const msg = `Are you sure you want to ${verb} pricing for this event?`;

    if (window.confirm(msg)) {
      setBroadcasting(id, checked);
    }
  };

  const {
    event: {
      isBroadcast,
      eventScore,
      eventScoreModifier,
      spring,
      springModifier
    },
    togglingBroadcasting,
    isAdmin
  } = props;
  return (
    <Panel>
      <PanelHeader>
        <Flex height="100%" align="center" justify="space-between">
          <Flex>
            <H4 margin="0" marginRight="2.5rem">
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
      <PanelContent>
        <EventPriceModifier event={props.event} />
        {isAdmin && (
          <Fragment>
            <Spacing height="1rem" />
            <EventPricingFactor
              type="eventScoreModifier"
              unit="$"
              base={eventScore}
              modifier={eventScoreModifier}
            />
            <Spacing height="1rem" />
            <EventPricingFactor
              type="springModifier"
              unit="%"
              base={spring}
              modifier={springModifier}
            />
          </Fragment>
        )}
      </PanelContent>
    </Panel>
  );
}
const mapStateToProps = createStructuredSelector({
  togglingBroadcasting: selectors.selectEventTogglingBroadcasting
});

const mapDispatchToProps = {
  setBroadcasting: actions.setEventBroadcasting
};

export const EventPricing = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPricingPresenter);
