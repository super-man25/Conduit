// @flow
import React from 'react';
import {
  Panel,
  PanelHeader,
  Flex,
  H4,
  PanelContent,
  ApiAlertPresenter,
  Text,
  Toggle
} from '_components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectors as eventSelectors,
  actions as eventActions
} from '_state/event';
import { actions as pricingPreviewActions } from '_state/pricingPreview';
import { PricingForm } from './PricingForm';
import { PricingPreview } from './PricingPreview';
import { eventService } from '_services';

import type { EDEvent } from '_models/event';
import type { EDPricingPreview } from '_models/pricingPreview';

const UnpaddedPanelContent = PanelContent.extend`
  padding: 0 !important;
`;

type Props = {
  event: EDEvent,
  togglingBroadcasting: boolean,
  setBroadcasting: Function,
  fetchPricingPreview: Function,
  pricingPreviewParamsChanged: Function,
  pricingPreview: {
    record: EDPricingPreview,
    loading: boolean
  }
};

type State = {
  alertState: Object
};

export class EventPricingPresenter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      alertState: {
        type: null,
        message: null
      }
    };
  }

  componentDidMount() {
    const {
      id,
      eventScore,
      eventScoreModifier,
      spring,
      springModifier
    } = this.props.event;

    this.props.fetchPricingPreview(
      id,
      +eventScore + (+eventScoreModifier || 0),
      +spring + (+springModifier || 0)
    );
  }

  handleChange = (values: any) => {
    const { id, eventScore, spring } = this.props.event;
    const { eventScoreModifier, springModifier } = values;
    this.props.pricingPreviewParamsChanged(
      id,
      +eventScore + (+eventScoreModifier || 0),
      +spring + (+springModifier || 0)
    );
  };

  showAlert = (alertState: Object) => {
    this.setState({ alertState });
    setTimeout(() => {
      this.setState({
        alertState: {
          type: null,
          message: null
        }
      });
    }, 3000);
  };

  handleSubmit = (values: any) => {
    const { id } = this.props.event;
    const { eventScoreModifier, springModifier } = values;
    return eventService
      .updateAdminModifiers(id, eventScoreModifier, springModifier)
      .catch((e) => {
        this.showAlert({
          type: 'api-error',
          message: e.toString()
        });

        throw e;
      });
  };

  toggleIsBroadcasting = (e: Object) => {
    const {
      setBroadcasting,
      event: { id }
    } = this.props;

    const { checked } = e.target;

    const verb = checked ? 'enable' : 'disable';
    const msg = `Are you sure you want to ${verb} pricing for this event?`;

    if (window.confirm(msg)) {
      setBroadcasting(id, checked);
    }
  };

  render() {
    const {
      event: {
        isBroadcast,
        eventScore,
        eventScoreModifier,
        spring,
        springModifier
      },
      togglingBroadcasting
    } = this.props;
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
                onChange={this.toggleIsBroadcasting}
                isDisabled={togglingBroadcasting}
                size="small"
                title={isBroadcast ? 'Disable pricing' : 'Enable pricing'}
              />
              {togglingBroadcasting && (
                <Text marginLeft="1.5rem">Saving...</Text>
              )}
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
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                initialValues={{
                  eventScore,
                  eventScoreModifier,
                  spring,
                  springModifier
                }}
              />
            </Flex>
            <Flex flex={1} justify="center" padding="20px 0">
              <PricingPreview
                pricingPreview={this.props.pricingPreview.record}
                loading={this.props.pricingPreview.loading}
              />
            </Flex>
          </Flex>
        </UnpaddedPanelContent>
        <ApiAlertPresenter alertState={this.state.alertState} />
      </Panel>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  togglingBroadcasting: eventSelectors.selectEventTogglingBroadcasting,
  pricingPreview: (state) => state.pricingPreview
});

const mapDispatchToProps = {
  setBroadcasting: eventActions.setEventBroadcasting,
  fetchPricingPreview: pricingPreviewActions.fetch,
  pricingPreviewParamsChanged: pricingPreviewActions.paramsChanged
};

export const EventPricing = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPricingPresenter);
