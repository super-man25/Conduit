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

type State = {
  isUpdatingBuyerTypeStatus: boolean
};

type Props = {
  createPriceRule: () => void,
  fetchBuyerTypes: () => EDBuyerType[],
  editingAnyPriceRule: true,
  buyerTypes: EDBuyerType[]
};

export class PricingRules extends React.Component<Props, State> {
  state = { isUpdatingBuyerTypeStatus: false };

  componentDidMount() {
    this.props.fetchBuyerTypes();
  }

  createNewPriceRule() {
    const { createPriceRule } = this.props;
    createPriceRule();
  }

  toggleBuyerTypeStatusModal() {
    const { isUpdatingBuyerTypeStatus } = this.state;
    this.setState({ isUpdatingBuyerTypeStatus: !isUpdatingBuyerTypeStatus });
  }

  render() {
    const { isUpdatingBuyerTypeStatus } = this.state;
    const { buyerTypes } = this.props;

    return (
      <PageWrapper>
        <SiteHeader />
        <PricingRuleFullContet scrollLocked={isUpdatingBuyerTypeStatus}>
          <ApiAlert />
          <PricingWrapper>
            <Spacing margin="1rem 0">
              <Breadcrumbs crumbs={pricingCrumb} />
              <Flex direction="row" justify="space-between" align="baseline">
                <H3 type="secondary">Pricing Rules</H3>
                <div>
                  <SecondaryButton
                    onClick={this.toggleBuyerTypeStatusModal.bind(this)}
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
          {isUpdatingBuyerTypeStatus && (
            <BuyerTypeStatusModal
              buyerTypes={buyerTypes}
              closeModal={this.toggleBuyerTypeStatusModal.bind(this)}
            />
          )}
        </Portal>
      </PageWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPriceRule: () => dispatch(actions.createPriceRule()),
  fetchBuyerTypes: () => dispatch(buyerTypeActions.fetchBuyerTypes())
});

const mapStateToProps = (
  { priceRule: { editingRowId }, buyerType: { buyerTypes } },
  ownProps
) => ({
  editingAnyPriceRule: editingRowId !== null,
  buyerTypes
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PricingRules));
