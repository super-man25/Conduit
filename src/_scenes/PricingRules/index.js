// @flow

import styled from 'styled-components';
import React from 'react';

import {
  H3,
  PageWrapper,
  SiteHeader,
  FullContent,
  FlexItem,
  Breadcrumbs,
  PrimaryButton,
  Spacing,
  Flex,
  Box
} from '_components';
import { VirtualizedPricingRules } from './components/PricingRulesTable';
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
    title: 'Pricing Rules',
    path: '/pricing'
  }
];

const PricingRulesTableTableContainer = styled(FlexItem)`
  min-height: 100%;
`;

type Props = {
  buyerTypeActions: any,
  priceRuleActions: any,
  editingAnyPriceRule: true
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
    const { editingAnyPriceRule } = this.props;

    return (
      <PageWrapper>
        <SiteHeader />
        <FullContent>
          <Flex
            direction="column"
            justify="center"
            padding="6rem 4rem"
            width="100%"
          >
            <Spacing margin="1rem 0">
              <Breadcrumbs crumbs={pricingCrumb} />
              <Flex direction="row" justify="space-between" align="baseline">
                <H3 type="secondary" size="28px" weight="heavy">
                  Pricing Rules
                </H3>
                <Box>
                  <PrimaryButton
                    onClick={this.createNewPriceRule.bind(this)}
                    disabled={editingAnyPriceRule}
                    style={{
                      marginLeft: '2rem',
                      cursor: editingAnyPriceRule ? 'not-allowed' : 'pointer'
                    }}
                  >
                    New Rule
                  </PrimaryButton>
                </Box>
              </Flex>
            </Spacing>
            <PricingRulesTableTableContainer>
              <VirtualizedPricingRules />
            </PricingRulesTableTableContainer>
          </Flex>
        </FullContent>
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
  buyerTypes: buyerTypeSelectors.selectAllBuyerTypes
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PricingRules));
