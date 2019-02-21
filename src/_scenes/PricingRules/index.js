// @flow
import React from 'react';

import {
  H3,
  PageWrapper,
  ApiAlert,
  SiteHeader,
  FullContent,
  FlexItem,
  Breadcrumbs,
  PrimaryButton,
  SecondaryButton,
  Spacing,
  Flex
} from '_components';
import { Portal } from '_components/Portal';
import { VirtualizedPricingRules } from './components/PricingRulesTable';
import { BuyerTypeStatusModal } from './components/BuyerTypeStatusModal';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '_state/priceRule';
import { actions as buyerTypeActions } from '_state/buyerType';

import type { EDBuyerType } from '_models/buyerType';

const pricingCrumb = [
  {
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    title: 'Team Settings',
    path: '/pricing'
  }
];

const PricingWrapper = Flex.extend`
  flex-direction: column;
  justify-content: center;
  padding: 6rem 4rem;
  width: 100%;
`;

const PricingRulesTableTableContainer = FlexItem.extend`
  min-height: 100%;
`;

const PricingRuleFullContet = FullContent.extend`
  overflow: ${(props) => (props.scrollLocked ? 'hidden' : 'visible')};
`;

type Props = {
  createPriceRule: () => void,
  fetchBuyerTypes: () => EDBuyerType[],
  editingAnyPriceRule: true,
  buyerTypes: EDBuyerType[],
  buyerTypesModalIsOpen: boolean,
  buyerTypesLoading: boolean,
  buyerTypesError: ?Error,
  openBuyerTypesModal: () => void,
  closeBuyerTypesModal: () => void,
  updateBuyerTypes: (buyerTypes: EDBuyerType[]) => void
};

export class PricingRules extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchBuyerTypes();
  }

  createNewPriceRule() {
    const { createPriceRule } = this.props;
    createPriceRule();
  }

  render() {
    const {
      buyerTypes,
      updateBuyerTypes,
      buyerTypesError,
      buyerTypesModalIsOpen,
      buyerTypesLoading,
      openBuyerTypesModal,
      closeBuyerTypesModal
    } = this.props;

    return (
      <PageWrapper>
        <SiteHeader />
        <PricingRuleFullContet scrollLocked={buyerTypesModalIsOpen}>
          <ApiAlert />
          <PricingWrapper>
            <Spacing margin="1rem 0">
              <Breadcrumbs crumbs={pricingCrumb} />
              <Flex direction="row" justify="space-between" align="baseline">
                <H3 type="secondary">Pricing Rules</H3>
                <div>
                  <SecondaryButton
                    onClick={openBuyerTypesModal}
                    disabled={buyerTypes.length === 0}
                  >
                    Buyer Types
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={this.createNewPriceRule.bind(this)}
                    disabled={this.props.editingAnyPriceRule}
                    style={{ marginLeft: '2rem' }}
                  >
                    New Rule
                  </PrimaryButton>
                </div>
              </Flex>
            </Spacing>
            <PricingRulesTableTableContainer>
              <VirtualizedPricingRules />
            </PricingRulesTableTableContainer>
          </PricingWrapper>
        </PricingRuleFullContet>
        <Portal>
          {buyerTypesModalIsOpen && (
            <BuyerTypeStatusModal
              buyerTypes={buyerTypes}
              closeModal={closeBuyerTypesModal}
              updateBuyerTypes={updateBuyerTypes}
              error={buyerTypesError}
              isLoading={buyerTypesLoading}
            />
          )}
        </Portal>
      </PageWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPriceRule: () => dispatch(actions.createPriceRule()),
  fetchBuyerTypes: () => dispatch(buyerTypeActions.fetchBuyerTypes()),
  openBuyerTypesModal: () => dispatch(buyerTypeActions.openBuyerTypesModal()),
  closeBuyerTypesModal: () => dispatch(buyerTypeActions.closeBuyerTypesModal()),
  updateBuyerTypes: (buyerTypes) =>
    dispatch(buyerTypeActions.updateBuyerTypes(buyerTypes))
});

const mapStateToProps = (
  {
    priceRule: { editingRowId },
    buyerType: { buyerTypes, loading, error, modalIsOpen }
  },
  ownProps
) => ({
  editingAnyPriceRule: editingRowId !== null,
  buyerTypes,
  buyerTypesLoading: loading,
  buyerTypesError: error,
  buyerTypesModalIsOpen: modalIsOpen
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PricingRules));
