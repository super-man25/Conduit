import React, { Component } from 'react';
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
  ApiAlertPresenter
} from '_components';
import { cssConstants } from '_constants';
import { eventService } from '../../../../../../_services/event';

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

  getWord = () => {
    return this.state.event.percentPriceModifier > 0 ? 'increase' : 'decrease';
  };

  getDisplayView = () => {
    return (
      <Text size={22}>
        {this.state.event.percentPriceModifier}% {this.getWord()}
      </Text>
    );
  };

  getEditView = () => {
    return (
      <NumberInputField
        component={Input}
        type="number"
        value={this.state.event.percentPriceModifier || ''}
        onChange={this.update}
        placeholder="Percent Price Modifier"
        inValid={this.state.percentPriceModifierInvalid}
      />
    );
  };

  update = (event) => {
    this.setState({
      percentPriceModifierInvalid: false,
      event: {
        ...this.state.event,
        percentPriceModifier: parseInt(event.target.value)
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

  render() {
    return (
      <Panel>
        <ApiAlertPresenter alertState={this.state.alertState} />
        <PanelHeader>
          <Flex height="100%" align="center" justify="space-between">
            <React.Fragment>
              <Flex>
                <H4 margin="0" marginRight="2.5rem">
                  Price Modifier
                </H4>
              </Flex>
            </React.Fragment>
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
          {this.state.isEditing ? this.getEditView() : this.getDisplayView()}
        </PanelContent>
      </Panel>
    );
  }
}
