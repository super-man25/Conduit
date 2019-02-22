// @flow
import * as React from 'react';
import type { EDBuyerType } from '_models/buyerType';
import { cssConstants } from '_constants';
import {
  Box,
  PrimaryButton,
  SecondaryButton,
  Flex,
  Spacing,
  Input
} from '_components';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Title,
  ErrorText,
  FilterBuyerTypesInput
} from './styled';
import { BuyerTypeRow } from './BuyerTypeRow';
import { BuyerTypeHeader } from './BuyerTypeHeader';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors as priceRuleSelectors } from '_state/priceRule';
import {
  actions as buyerTypeActions,
  selectors as buyerTypeSelectors
} from '_state/buyerType';

type Props = {
  buyerTypes: EDBuyerType[],
  buyerTypeActions: any,
  isLoading: boolean,
  error: ?Error,
  buyerTypesInActivePriceRules: string[]
};

type State = {
  visibleBuyerTypes: EDBuyerType[],
  editedBuyerTypes: any
};

export class BuyerTypeStatusModalPresenter extends React.Component<
  Props,
  State
> {
  state = { visibleBuyerTypes: [], editedBuyerTypes: {} };
  componentDidMount() {
    document.addEventListener('keydown', this.closeOnEscapePressed);
    const { buyerTypes } = this.props;
    this.setState({ visibleBuyerTypes: buyerTypes });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeOnEscapePressed);
  }

  closeOnEscapePressed = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.props.buyerTypeActions.closeBuyerTypesModal();
    }
  };

  filterBuyerTypes = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value } = (e.currentTarget: HTMLInputElement);
    const lowerCaseVal = value.toLowerCase();
    const { buyerTypes } = this.props;

    if (!value || value === '') {
      this.setState({ visibleBuyerTypes: buyerTypes });
    }

    const filteredBuyerTypes = buyerTypes.filter(
      ({ code, publicDescription }) =>
        code.toLowerCase().includes(lowerCaseVal) ||
        publicDescription.toLowerCase().includes(lowerCaseVal)
    );

    this.setState({
      visibleBuyerTypes: filteredBuyerTypes
    });
  };

  updateBuyerTypes = () => {
    const {
      buyerTypeActions: { updateBuyerTypes }
    } = this.props;
    const editedBuyerTypeArray = Object.values(this.state.editedBuyerTypes);

    updateBuyerTypes(editedBuyerTypeArray);
  };

  onBuyerTypeToggle = ({ id, disabled, ...rest }: EDBuyerType) => {
    const { editedBuyerTypes } = this.state;
    this.setState({
      editedBuyerTypes: {
        ...editedBuyerTypes,
        [id]: { ...rest, id, disabled: !disabled }
      }
    });
  };

  render() {
    const {
      buyerTypeActions: { closeBuyerTypesModal },
      buyerTypesInActivePriceRules,
      error,
      isLoading
    } = this.props;
    const { visibleBuyerTypes, editedBuyerTypes } = this.state;
    return (
      <Box>
        <ModalContent>
          <ModalHeader>
            <Title type="secondary">Buyer Types</Title>
            <Input
              component={FilterBuyerTypesInput}
              placeholder={'Filter Buyer Types'}
              onChange={this.filterBuyerTypes.bind(this)}
            />
          </ModalHeader>
          <ModalBody>
            <BuyerTypeHeader />
            <Spacing margin="1rem" />
            <Flex direction="column" justify="center" align="center">
              {visibleBuyerTypes.map((buyerType, idx) => (
                <BuyerTypeRow
                  buyerType={editedBuyerTypes[buyerType.id] || buyerType}
                  key={buyerType.id}
                  toggleDisabled={buyerTypesInActivePriceRules.includes(
                    buyerType.id
                  )}
                  onBuyerTypeToggle={this.onBuyerTypeToggle.bind(this)}
                />
              ))}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <ErrorText
              margin="0 1rem 1rem 0"
              size={12}
              weight={300}
              color={cssConstants.SECONDARY_RED}
            >
              {error && error.toString()}
            </ErrorText>
            <Flex align="center" justify="flex-end">
              <SecondaryButton
                disabled={isLoading}
                onClick={closeBuyerTypesModal}
              >
                Cancel
              </SecondaryButton>
              <Spacing margin="1rem" />
              <PrimaryButton
                disabled={
                  isLoading || Object.keys(editedBuyerTypes).length === 0
                }
                onClick={this.updateBuyerTypes.bind(this)}
              >
                Save
              </PrimaryButton>
            </Flex>
          </ModalFooter>
        </ModalContent>
        <ModalOverlay onClick={closeBuyerTypesModal} />
      </Box>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: buyerTypeSelectors.selectIsLoading,
  error: buyerTypeSelectors.selectError,
  buyerTypesInActivePriceRules:
    priceRuleSelectors.selectBuyerTypesInActivePriceRules
});

const mapDispatchToProps = (dispatch) => ({
  buyerTypeActions: bindActionCreators(buyerTypeActions, dispatch)
});

export const BuyerTypeStatusModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyerTypeStatusModalPresenter);
