import React, { Component, Fragment } from 'react';
import {
  NumberInputField,
  Input,
  Text,
  ApiAlert,
  EDTextButton,
  Flex
} from '_components';
import { connect } from 'react-redux';
import { actions } from '_state/event';
import { formatUSD } from '_helpers/string-utils';

export class EventPricingFactorPresenter extends Component {
  state = {
    isEditing: false,
    modifier: this.props.modifier,
    modelInvalid: false
  };

  formatDisplayUnit = (unit, value) => {
    return unit === '$'
      ? `${formatUSD(value || 0)}`
      : `${(value || 0).toFixed(2)}${unit}`;
  };

  getDisplayType = (type) => {
    return type === 'eventScoreModifier' ? 'Event Score' : 'Spring';
  };

  getDisplay = (props) => {
    const { type, unit, base, modifier } = props;

    return `${this.getDisplayType(type)}: ${this.formatDisplayUnit(
      unit,
      (base || 0) + modifier
    )}`;
  };

  getPlaceholderText = (type) => {
    return type === 'eventScoreModifier'
      ? 'Event Score Modifier'
      : 'Spring Modifier';
  };

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing,
      modifier: this.props.modifier,
      modelInvalid: false
    });
  };

  calculateResult = (unit, base) => {
    const { modifier } = this.state;
    const result = parseFloat(base || 0) + parseFloat(modifier);
    return this.formatDisplayUnit(unit, result);
  };

  onBlur = (event) => {
    if (!event.target.value) {
      this.setState({
        modifier: '0'
      });
    }
  };

  update = (event) => {
    this.setState({
      modifier: event.target.value,
      modelInvalid: false
    });
  };

  save = () => {
    const {
      saveAdminModifiers,
      seasonId,
      event: {
        event: { id, eventScoreModifier, springModifier }
      },
      type
    } = this.props;

    const payload = {
      eventId: id,
      eventScoreModifier,
      springModifier,
      [type]: parseFloat(this.state.modifier).toFixed(2)
    };
    saveAdminModifiers(
      payload.eventId,
      payload.eventScoreModifier,
      payload.springModifier,
      seasonId,
      (error) => {
        error ? this.setState({ modelInvalid: true }) : this.toggleEdit();
      }
    );
  };

  render() {
    const { type, unit, base } = this.props;
    return (
      <Fragment>
        <ApiAlert />
        {this.state.isEditing ? (
          <Fragment>
            <Flex justify="space-between">
              <Text marginBottom=".33rem" size={15}>
                {this.getDisplayType(type)}
              </Text>
              <Flex>
                <EDTextButton
                  type="primary"
                  size="medium"
                  weight="normal"
                  onClick={this.toggleEdit}
                  marginRight="10px"
                >
                  CANCEL
                </EDTextButton>
                <EDTextButton
                  type="primary"
                  size="medium"
                  weight="normal"
                  onClick={this.save}
                >
                  SAVE
                </EDTextButton>
              </Flex>
            </Flex>
            <Flex align="center">
              <Text marginRight="8px" size={18}>
                {this.formatDisplayUnit(unit, base)} +{' '}
              </Text>
              <NumberInputField
                component={Input}
                type="number"
                value={this.state.modifier}
                width="40%"
                onChange={this.update}
                onBlur={this.onBlur}
                placeholder={this.getPlaceholderText(type)}
                inValid={this.state.modelInvalid}
              />
              <Text marginLeft="8px" size={18}>
                = {this.calculateResult(unit, base)}
              </Text>
            </Flex>
          </Fragment>
        ) : (
          <Flex justify="space-between">
            <Text size={18}>{this.getDisplay(this.props)}</Text>
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

const mapStateToProps = (state) => ({
  event: state.event,
  savingAdminModifiers: state.savingAdminModifiers,
  seasonId: state.season.activeId
});

const mapDispatchToProps = {
  saveAdminModifiers: actions.saveAdminModifiers
};

export const EventPricingFactor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPricingFactorPresenter);
