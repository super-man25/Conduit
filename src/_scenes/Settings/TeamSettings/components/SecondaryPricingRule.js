import React, { Component, Fragment } from 'react';
import { integrationService } from '../../../../_services/integration';
import {
  SettingEditButton,
  SettingSaveButton,
  SettingCancelButton,
  NumberInputField,
  Flex,
  FlexItem,
  Input,
  ApiAlertPresenter
} from '_components';

export class SecondaryPricingRule extends Component {
  state = {
    isEditing: false,
    id: this.props.id,
    percent: this.props.percent,
    constant: this.props.constant,
    percentInvalid: false,
    constantInvalid: false,
    alertState: {
      type: null,
      message: null
    }
  };

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  saveSettings = () => {
    const { isEditing, id, ...payload } = this.state;
    integrationService
      .updateSecondaryPricingRule(id, payload)
      .then(this.handleSuccess)
      .catch(this.handleError);
    setTimeout(this.resetState, 3000);
  };

  handleSuccess = (res) => {
    this.setState({
      percentInvalid: false,
      constantInvalid: false,
      alertState: {
        type: 'api-success',
        message: res.message
      }
    });
    this.toggleEdit();
  };

  handleError = (error) => {
    error.path === 'percent'
      ? this.setState({ isEditing: true, percentInvalid: true })
      : this.setState({ isEditing: true, constantInvalid: true });

    this.setState({
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

  update = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      percentInvalid: false,
      constantInvalid: false
    });
  };

  handleFocus = (name) => {
    name === 'percent'
      ? this.setState({ constant: null })
      : this.setState({ percent: null });
  };

  render() {
    return (
      <div>
        <ApiAlertPresenter alertState={this.state.alertState} />
        {!this.state.isEditing && (
          <SettingEditButton onClick={this.toggleEdit} />
        )}
        {this.state.isEditing && (
          <Fragment>
            <Flex justify>
              <SettingSaveButton onClick={this.saveSettings} />
              <SettingCancelButton onClick={this.toggleEdit} />
            </Flex>
            <Flex inline flex-direction="column">
              <FlexItem width="40%">
                <NumberInputField
                  component={Input}
                  type="number"
                  name="percent"
                  value={this.state.percent || ''}
                  onChange={(e) => this.update(e)}
                  onFocus={(e) => this.handleFocus(e.target.name)}
                  placeholder="Percent"
                  inValid={this.state.percentInvalid}
                />
              </FlexItem>
              <FlexItem width="40%">
                <NumberInputField
                  component={Input}
                  type="number"
                  name="constant"
                  value={this.state.constant || ''}
                  onChange={(e) => this.update(e)}
                  onFocus={(e) => this.handleFocus(e.target.name)}
                  placeholder="Constant"
                  inValid={this.state.constantInvalid}
                />
              </FlexItem>
            </Flex>
          </Fragment>
        )}
      </div>
    );
  }
}
