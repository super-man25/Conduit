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
  Spacing,
  Flex
} from '_components';
import { VirtualizedPricingRules } from './components/PricingRulesTable';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '_state/priceRule';

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

type Props = {
  createPriceRule: () => void,
  editingAnyPriceRule: true
};

export class PricingRules extends React.Component<Props> {
  createNewPriceRule() {
    const { createPriceRule } = this.props;
    createPriceRule();
  }

  render() {
    return (
      <PageWrapper>
        <SiteHeader />
        <FullContent padding="2rem">
          <ApiAlert />
          <PricingWrapper>
            <Spacing margin="1rem 0">
              <Breadcrumbs crumbs={pricingCrumb} />
              <Flex direction="row" justify="space-between" align="baseline">
                <H3 type="secondary">Pricing Rules</H3>
                <PrimaryButton
                  onClick={this.createNewPriceRule.bind(this)}
                  disabled={this.props.editingAnyPriceRule}
                >
                  New Rule
                </PrimaryButton>
              </Flex>
            </Spacing>
            <PricingRulesTableTableContainer>
              <VirtualizedPricingRules />
            </PricingRulesTableTableContainer>
          </PricingWrapper>
        </FullContent>
      </PageWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPriceRule: () => dispatch(actions.createPriceRule())
});

const mapStateToProps = ({ priceRule: { editingRowId } }, ownProps) => ({
  editingAnyPriceRule: editingRowId !== null
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PricingRules));
