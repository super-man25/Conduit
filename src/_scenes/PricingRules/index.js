// @flow
import React from 'react';
import type { EDBuyerType } from '_models/buyerType';

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
import { bindActionCreators } from 'redux';
import {
  actions as priceRuleActions,
  selectors as priceRuleSelectors
} from '_state/priceRule';
import {
  actions as buyerTypeActions,
  selectors as buyerTypeSelectors
} from '_state/buyerType';
import { createStructuredSelector } from 'reselect';

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
  buyerTypeActions: any,
  priceRuleActions: any,
  editingAnyPriceRule: true,
  buyerTypes: EDBuyerType[],
  buyerTypesModalIsOpen: boolean
};

export class PricingRules extends React.Component<Props> {
  componentDidMount() {
    this.props.buyerTypeActions.fetchBuyerTypes();
  }

  createNewPriceRule() {
    const {
      priceRuleActions: { createPriceRule }
    } = this.props;
    createPriceRule();
  }

  render() {
    const {
      buyerTypes,
      buyerTypesModalIsOpen,
      buyerTypeActions: { openBuyerTypesModal }
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
            <BuyerTypeStatusModal buyerTypes={buyerTypes} />
          )}
        </Portal>
      </PageWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  priceRuleActions: bindActionCreators(priceRuleActions, dispatch),
  buyerTypeActions: bindActionCreators(buyerTypeActions, dispatch)
});

const mapStateToProps = createStructuredSelector({
  editingAnyPriceRule: priceRuleSelectors.selectIsEditingPriceRule,
  buyerTypes: buyerTypeSelectors.selectAllBuyerTypes,
  buyerTypesModalIsOpen: buyerTypeSelectors.selectModalIsOpen
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PricingRules));