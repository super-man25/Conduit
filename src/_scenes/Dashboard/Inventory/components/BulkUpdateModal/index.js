import React, { Component } from 'react';
import { cssConstants, ROW_SEATS_NETWORK_CHUNK_SIZE } from '_constants';
import {
  Box,
  Toggle,
  Flex,
  Text,
  SecondaryButton,
  SelectDropdown,
  NumberInputField,
  AsyncButton,
  Modal,
} from '_components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectors, actions } from '_state/eventInventoryBulk';
import { selectors as eventInventorySelectors } from '_state/eventInventory';
import { validateDecimal } from '_helpers';
import {
  ModalHeader,
  Title,
  ModalBody,
  Label,
  Field,
  NumberInput,
  FieldErrorText,
} from './styled';

const ACTIONS = {
  updatePrice: 0,
  updateListed: 1,
  updateMinimumPrice: 2,
  updateMaximumPrice: 3,
};

export const selectActions = [
  {
    label: 'Update Manual Price',
    value: ACTIONS.updatePrice,
    dataKey: 'overridePrice',
  },
  {
    label: 'Update Pricing Status',
    value: ACTIONS.updateListed,
    dataKey: 'isListed',
  },
  {
    label: 'Update Minimum Price',
    value: ACTIONS.updateMinimumPrice,
    dataKey: 'minimumPrice',
  },
  {
    label: 'Update Maximum Price',
    value: ACTIONS.updateMaximumPrice,
    dataKey: 'maximumPrice',
  },
];

export class BulkUpdateModalPresenter extends Component {
  state = {
    touched: {},
    selectedAction: selectActions[0],
    value: '',
  };

  onBlur = (e) => {
    const { touched } = this.state;
    const { name, value } = e.target;

    this.setState({
      touched: {
        ...touched,
        [name]: value,
      },
    });
  };

  onActionChanged = (selectedAction) => {
    const value = selectedAction.value === ACTIONS.updatePrice ? '' : false;
    this.setState({ selectedAction, value });
  };

  updatePrice = (e) => {
    this.setState({ value: e.target.value });
  };

  updateIsListed = (e) => {
    this.setState({ value: e.target.checked });
  };

  submit = () => {
    const { submitBulkUpdate } = this.props;
    const { value, selectedAction } = this.state;

    submitBulkUpdate({
      [selectedAction.dataKey]: value,
    });
  };

  get isValidPrice() {
    const { value } = this.state;

    const isValidNumber = validateDecimal(value, {
      decimalDigits: '1,2',
    });

    return isValidNumber && Number(value) >= 0;
  }

  get showNetworkWarning() {
    const { rows } = this.props;

    const totalSeatIds = rows.reduce((acc, row) => acc + row.seats.length, 0);
    return totalSeatIds > ROW_SEATS_NETWORK_CHUNK_SIZE;
  }

  submitEnabled() {
    const { selectedAction } = this.state;

    if (selectedAction.value === ACTIONS.updatePrice) {
      return this.isValidPrice;
    }

    return true;
  }

  render() {
    const { selectedAction, value } = this.state;
    const { cancelBulkUpdate, rows } = this.props;

    const submitEnabled = this.submitEnabled();

    return (
      <Modal closeModal={cancelBulkUpdate}>
        <ModalHeader>
          <Title>Bulk Inventory Update</Title>
          <Text weight={300} size={14}>
            Updating inventory for {rows.length} row(s).
          </Text>
          {this.showNetworkWarning && (
            <Text
              color={cssConstants.SECONDARY_BLUE_ACCENT}
              marginTop="1rem"
              size={12}
            >
              Note: This update will result in multiple network requests
            </Text>
          )}
        </ModalHeader>
        <ModalBody>
          <Box marginBottom="2rem">
            <Label>Action</Label>
            <SelectDropdown
              onChange={this.onActionChanged}
              full
              selected={selectedAction}
              options={selectActions}
            />
          </Box>
          {selectedAction.value === ACTIONS.updatePrice && (
            <Field marginBottom="2rem">
              <Label>Manual Price</Label>
              <NumberInputField
                component={NumberInput}
                name="price"
                type="number"
                value={value}
                onBlur={this.onBlur}
                onChange={this.updatePrice}
                placeholder="$ Manual Price"
              />
              {this.state.touched.price && !this.isValidPrice && (
                <FieldErrorText
                  marginTop="0.5rem"
                  size={12}
                  weight={300}
                  color={cssConstants.SECONDARY_RED}
                >
                  Manual Price must be a valid dollar amount.
                </FieldErrorText>
              )}
            </Field>
          )}
          {selectedAction.value === ACTIONS.updateListed && (
            <Field marginBottom="1.5rem">
              <Label>Pricing</Label>
              <Toggle
                isChecked={value}
                onChange={this.updateIsListed}
                size="small"
              />
            </Field>
          )}
          {selectedAction.value === ACTIONS.updateMinimumPrice && (
            <Field marginBottom="2rem">
              <Label>Minimum Price</Label>
              <NumberInputField
                component={NumberInput}
                name="price"
                type="number"
                value={value}
                onBlur={this.onBlur}
                onChange={this.updatePrice}
                placeholder="$ Minimumn Price"
              />
              {this.state.touched.price && !this.isValidPrice && (
                <FieldErrorText
                  marginTop="0.5rem"
                  size={12}
                  weight={300}
                  color={cssConstants.SECONDARY_RED}
                >
                  Minimum Price must be a valid dollar amount.
                </FieldErrorText>
              )}
            </Field>
          )}
          {selectedAction.value === ACTIONS.updateMaximumPrice && (
            <Field marginBottom="2rem">
              <Label>Maximum Price</Label>
              <NumberInputField
                component={NumberInput}
                name="price"
                type="number"
                value={value}
                onBlur={this.onBlur}
                onChange={this.updatePrice}
                placeholder="$ Maximumn Price"
              />
              {this.state.touched.price && !this.isValidPrice && (
                <FieldErrorText
                  marginTop="0.5rem"
                  size={12}
                  weight={300}
                  color={cssConstants.SECONDARY_RED}
                >
                  Maximum Price must be a valid dollar amount.
                </FieldErrorText>
              )}
            </Field>
          )}
          <Flex justify="flex-end">
            <SecondaryButton
              small
              onClick={cancelBulkUpdate}
              margin="0 1rem 0 0"
            >
              Cancel
            </SecondaryButton>
            <AsyncButton
              isLoading={this.props.loading}
              disabled={!submitEnabled}
              onClick={this.submit}
            >
              Submit
            </AsyncButton>
          </Flex>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  rows: eventInventorySelectors.selectSelectedRows,
  loading: selectors.isLoading,
});

const mapDispatchToProps = {
  cancelBulkUpdate: actions.cancelBulkUpdate,
  submitBulkUpdate: actions.submitBulkUpdate,
};

export const BulkUpdateModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkUpdateModalPresenter);