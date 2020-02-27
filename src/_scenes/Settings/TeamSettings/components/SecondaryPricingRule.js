import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  SettingEditButton,
  PrimaryButton,
  NumberInputField,
  Flex,
  FlexItem,
  Input,
  TextButton,
} from '_components';
import { withClickAway } from '_hoc';
import { actions } from '_state/client';

const ClickAwayDiv = withClickAway(Fragment);

export class SecondaryPricingRulePresenter extends Component {
  state = {
    isEditing: false,
    id: this.props.id,
    percent: this.props.percent,
    constant: this.props.constant,
    percentInvalid: false,
    constantInvalid: false,
  };

  reset = () => {
    this.setState({
      isEditing: false,
      id: this.props.id,
      percent: this.props.percent,
      constant: this.props.constant,
      percentInvalid: false,
      constantInvalid: false,
    });
  };

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  saveSettings = () => {
    const { id, percent, constant } = this.state;
    const payload = {
      id,
      percent: percent !== '' ? percent : null,
      constant: constant !== '' ? constant : null,
      onSuccess: this.handleSuccess,
      onError: this.handleError,
    };
    this.props.updateSecondaryPricingRule(payload);
  };

  handleSuccess = () => {
    this.setState({
      percentInvalid: false,
      constantInvalid: false,
    });
    this.toggleEdit();
  };

  handleError = (error) => {
    error.path === 'percent'
      ? this.setState({ isEditing: true, percentInvalid: true })
      : this.setState({ isEditing: true, constantInvalid: true });
  };

  update = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      percentInvalid: false,
      constantInvalid: false,
    });
  };

  handleFocus = (name) => {
    name === 'percent'
      ? this.setState({ constant: null })
      : this.setState({ percent: null });
  };

  render() {
    return (
      <ClickAwayDiv onClickAway={this.reset}>
        {this.state.isEditing ? (
          <Fragment>
            <Flex inline direction="row" align="center" marginBottom="15px">
              <FlexItem margin="0 10px 0 0">
                <NumberInputField
                  component={Input}
                  name="percent"
                  value={this.state.percent || ''}
                  onChange={this.update}
                  onFocus={(e) => this.handleFocus(e.target.name)}
                  placeholder="Percent"
                  invalid={this.state.percentInvalid}
                />
              </FlexItem>
              <FlexItem margin="0 0 0 10px">
                <NumberInputField
                  component={Input}
                  name="constant"
                  value={this.state.constant || ''}
                  onChange={this.update}
                  onFocus={(e) => this.handleFocus(e.target.name)}
                  placeholder="Constant"
                  invalid={this.state.constantInvalid}
                />
              </FlexItem>
            </Flex>
            <PrimaryButton onClick={this.saveSettings}>Save</PrimaryButton>
            <TextButton onClick={this.toggleEdit}>Cancel</TextButton>
          </Fragment>
        ) : (
          <SettingEditButton weight="bold" onClick={this.toggleEdit} />
        )}
      </ClickAwayDiv>
    );
  }
}

const mapDispatchToProps = {
  updateSecondaryPricingRule: actions.updateSecondaryPricingRule,
};

export const SecondaryPricingRule = connect(
  null,
  mapDispatchToProps
)(SecondaryPricingRulePresenter);
