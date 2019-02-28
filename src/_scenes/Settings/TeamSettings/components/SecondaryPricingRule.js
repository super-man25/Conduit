import React, { Component, Fragment } from 'react';
import {
  SettingEditButton,
  SettingSaveButton,
  NumberInputField,
  Flex
} from '_components';
import { Input } from '../../../../_components/Input';
class SecondaryPricingRule extends Component {
  state = {
    isEditing: false,
    id: this.props.id,
    percent: this.props.percent,
    constant: this.props.constant
  };

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  saveSettings = () => {
    const { isEditing, ...payload } = this.state;
    this.props.onChange(payload);
    this.toggleEdit();
  };

  update = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        {!this.state.isEditing && (
          <SettingEditButton onClick={this.toggleEdit} />
        )}
        {this.state.isEditing && (
          <Fragment>
            <SettingSaveButton onClick={this.saveSettings} />
            <Flex>
              <NumberInputField
                component={Input}
                type="number"
                name="percent"
                value={this.state.percent}
                onChange={(e) => this.update(e)}
                placeholder="Percent"
              />
              <NumberInputField
                component={Input}
                type="number"
                name="constant"
                value={this.state.constant}
                onChange={(e) => this.update(e)}
                placeholder="Constant"
              />
            </Flex>
          </Fragment>
        )}
      </div>
    );
  }
}
export default SecondaryPricingRule;
