import React, { Component, Fragment } from 'react';
import {
  NumberInputField,
  Input,
  Text,
  ApiAlertPresenter,
  Flex,
  EDTextButton
} from '_components';
import { eventService } from '_services/event';

export class EventPriceModifier extends Component {
  state = {
    isEditing: false,
    event: this.props.event,
    alertState: {
      type: null,
      message: null
    },
    percentPriceModifierInvalid: false
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

  getWord = () => {
    return this.state.event.percentPriceModifier >= 0 ? 'increase' : 'decrease';
  };

  saveUpdate = () => {
    const { id, percentPriceModifier } = this.state.event;
    eventService
      .updatePercentPriceModifier(id, percentPriceModifier)
      .then(this.handleSuccess)
      .catch(this.handleError);
  };

  handleSuccess = (event) => {
    this.setState(
      {
        event,
        alertState: {
          type: 'api-success',
          message: 'Price Modifier Successfully Saved.'
        }
      },
      () => setTimeout(this.resetAlertState, 3000)
    );
    this.toggleEdit();
  };

  handleError = (error) => {
    this.setState(
      {
        percentPriceModifierInvalid: true,
        alertState: {
          type: 'api-error',
          message: error.toString()
        }
      },
      () => setTimeout(this.resetAlertState, 3000)
    );
  };

  resetAlertState = () => {
    this.setState({
      alertState: {
        type: null,
        message: null
      }
    });
  };

  render() {
    return (
      <Fragment>
        <ApiAlertPresenter alertState={this.state.alertState} />
        {this.state.isEditing ? (
          <Fragment>
            <Flex justify="space-between">
              <Text marginBottom=".33rem" size={15}>
                Price Modification (%)
              </Text>
              <EDTextButton
                type="primary"
                size="medium"
                weight="normal"
                onClick={this.saveUpdate}
              >
                SAVE
              </EDTextButton>
            </Flex>
            <NumberInputField
              component={Input}
              value={this.state.event.percentPriceModifier}
              onChange={this.update}
              onBlur={this.onBlur}
              placeholder="Percent Price Modifier"
              inValid={this.state.percentPriceModifierInvalid}
            />
          </Fragment>
        ) : (
          <Flex justify="space-between">
            <Text size={18}>
              Price Modifier: {this.state.event.percentPriceModifier}%{' '}
              {this.getWord()}
            </Text>
            <EDTextButton
              type="primary"
              size="medium"
              weight="normal"
              onClick={this.toggleEdit}
            >
              EDIT
            </EDTextButton>
          </Flex>
        )}
      </Fragment>
    );
  }
}
