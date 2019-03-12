import React, { Component, Fragment } from 'react';
import {
  Panel,
  PanelHeader,
  Flex,
  H4,
  PanelContent,
  EDText,
  Text,
  NumberInputField,
  Input,
  Toggle,
  ApiAlertPresenter
} from '_components';
import { connect } from 'react-redux';
import { cssConstants } from '_constants';
import { eventService } from '_services/event';
import { createStructuredSelector } from 'reselect';
import { selectors, actions } from '_state/event';

export const EDTextButton = EDText.extend`
  &:hover {
    outline: 0;
    text-decoration: none;
    cursor: pointer;
    color: ${cssConstants.PRIMARY_LIGHT_BLUE};
    transition: all 0.1s ease-in-out;
    text-shadow: 0 0 0.1px ${cssConstants.PRIMARY_LIGHT_BLUE};
  }
`;

export class EventPriceModifierPresenter extends Component {
  state = {
    isEditing: false,
    event: this.props.event,
    alertState: {
      type: null,
      message: null
    },
    percentPriceModifierInvalid: false
  };

  getWord = () => {
    return this.state.event.percentPriceModifier >= 0 ? 'increase' : 'decrease';
  };

  onBlur = (event) => {
    if (!event.target.value) {
      this.setState({
        percentPriceModifierInvalid: false,
        event: {
          ...this.state.event,
          percentPriceModifier: '0'
        }
      });
    }
  };

  update = (event) => {
    this.setState({
      percentPriceModifierInvalid: false,
      event: {
        ...this.state.event,
        percentPriceModifier: event.target.value
      }
    });
  };

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  saveUpdate = () => {
    const { id, percentPriceModifier } = this.state.event;
    eventService
      .updatePercentPriceModifier(id, percentPriceModifier)
      .then(this.handleSuccess)
      .catch(this.handleError);
    setTimeout(this.resetState, 3000);
  };

  handleSuccess = (event) => {
    this.setState({
      event,
      alertState: {
        type: 'api-success',
        message: 'Price Modifier Successfully Saved.'
      }
    });
    this.toggleEdit();
  };

  handleError = (error) => {
    this.setState({
      percentPriceModifierInvalid: true,
      alertState: {
        type: 'api-error',
        message: error.message
      }
    });
  };

  resetState = () => {
    this.setState({
      alertState: {
        type: null,
        message: null
      }
    });
  };

  toggleIsBroadcasting = (e) => {
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
      event: { isBroadcast },
      togglingBroadcasting
    } = this.props;

    return (
      <Panel>
        <ApiAlertPresenter alertState={this.state.alertState} />
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
            {this.state.isEditing ? (
              <EDTextButton
                type="primary"
                size="medium"
                weight="normal"
                onClick={this.saveUpdate}
              >
                SAVE
              </EDTextButton>
            ) : (
              <EDTextButton
                type="primary"
                size="medium"
                weight="normal"
                onClick={this.toggleEdit}
              >
                EDIT
              </EDTextButton>
            )}
          </Flex>
        </PanelHeader>
        <PanelContent>
          {this.state.isEditing ? (
            <Fragment>
              <Text marginBottom=".33rem" size={15}>
                Price Modification (%)
              </Text>
              <NumberInputField
                component={Input}
                type="number"
                value={this.state.event.percentPriceModifier}
                onChange={this.update}
                onBlur={this.onBlur}
                placeholder="Percent Price Modifier"
                inValid={this.state.percentPriceModifierInvalid}
              />
            </Fragment>
          ) : (
            <Text size={22}>
              {this.state.event.percentPriceModifier}% {this.getWord()}
            </Text>
          )}
        </PanelContent>
      </Panel>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  togglingBroadcasting: selectors.selectEventTogglingBroadcasting
});

const mapDispatchToProps = {
  setBroadcasting: actions.setEventBroadcasting
};

export const EventPriceModifier = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPriceModifierPresenter);
