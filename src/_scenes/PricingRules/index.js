// @flow

import styled from 'styled-components';
import React from 'react';

import { cssConstants } from '_constants';
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
  Box,
  Dropdown,
} from '_components';
import { VirtualizedPricingRules } from './components/PricingRulesTable';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  actions as priceRuleActions,
  selectors as priceRuleSelectors,
} from '_state/priceRule';
import {
  actions as buyerTypeActions,
  selectors as buyerTypeSelectors,
} from '_state/buyerType';
import {
  selectors as seasonSelectors,
  actions as seasonActions,
} from '_state/season';
import { createStructuredSelector } from 'reselect';
import type { EDSeason } from '_models';

const pricingCrumb = [
  {
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    title: 'Pricing Rules',
    path: '/pricing',
  },
];

const PricingRulesTableTableContainer = styled(FlexItem)`
  min-height: 100%;
`;

const SeasonDropdown = styled(Dropdown)`
  margin-top: 5px;
`;

const DropdownItem = styled.div``;

type Props = {
  buyerTypeActions: any,
  priceRuleActions: any,
  editingAnyPriceRule: boolean,
  activeSeasonId: number,
  seasons: EDSeason[],
  selectedSeason: EDSeason,
  setActiveSeasonId: (id: number) => void,
  cancelEditingRule: () => void,
};

export class PricingRules extends React.Component<Props> {
  componentDidMount() {
    this.getBuyerTypes();
  }

  componentDidUpdate(prevProps: Props) {
    const { activeSeasonId, cancelEditingRule } = this.props;

    if (prevProps.activeSeasonId !== activeSeasonId) {
      this.getBuyerTypes();

      // Cover case of switching seasons while editing/adding price rule
      cancelEditingRule();
    }
  }

  createNewPriceRule() {
    const {
      priceRuleActions: { createPriceRule },
    } = this.props;
    createPriceRule();
  }

  getBuyerTypes() {
    const { activeSeasonId, buyerTypeActions } = this.props;

    buyerTypeActions.fetchBuyerTypes({
      seasonId: activeSeasonId,
    });
  }

  render() {
    const {
      editingAnyPriceRule,
      activeSeasonId,
      seasons,
      selectedSeason,
      setActiveSeasonId,
    } = this.props;

    const seasonsWithPricingRuleName = seasons.map((season) => {
      const startYear = new Date(season.startTimestamp).getFullYear();
      const endYear = new Date(season.endTimestamp).getFullYear();

      const newName =
        startYear === endYear ? endYear : `${startYear} - ${endYear}`;

      return {
        ...season,
        nameWithPricingRules: newName + ' Pricing Rules',
      };
    });

    // If no selected season, display placeholder text
    const selectedSeasonWithPricingRuleName = selectedSeason
      ? seasonsWithPricingRuleName.find(({ id }) => id === selectedSeason.id)
      : null;

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
                <SeasonDropdown
                  arrowColor={cssConstants.SECONDARY_BLUE}
                  options={seasonsWithPricingRuleName}
                  selected={selectedSeasonWithPricingRuleName}
                  noneSelected={<H3>Select a Season</H3>}
                  parseOption={(option) => option.nameWithPricingRules}
                  onChange={(option) => setActiveSeasonId(option.id)}
                  renderSelected={(option) => (
                    <DropdownItem>{option.nameWithPricingRules}</DropdownItem>
                  )}
                />
                <Box>
                  <PrimaryButton
                    onClick={this.createNewPriceRule.bind(this)}
                    disabled={editingAnyPriceRule}
                    style={{
                      marginLeft: '2rem',
                      cursor: editingAnyPriceRule ? 'not-allowed' : 'pointer',
                    }}
                  >
                    New Rule
                  </PrimaryButton>
                </Box>
              </Flex>
            </Spacing>
            <PricingRulesTableTableContainer>
              <VirtualizedPricingRules activeSeasonId={activeSeasonId} />
            </PricingRulesTableTableContainer>
          </Flex>
        </FullContent>
      </PageWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  priceRuleActions: bindActionCreators(priceRuleActions, dispatch),
  buyerTypeActions: bindActionCreators(buyerTypeActions, dispatch),
  setActiveSeasonId: bindActionCreators(seasonActions.setActiveId, dispatch),
  cancelEditingRule: bindActionCreators(
    priceRuleActions.cancelEditingPriceRule,
    dispatch
  ),
});

const mapStateToProps = createStructuredSelector({
  editingAnyPriceRule: priceRuleSelectors.selectIsEditingPriceRule,
  buyerTypes: buyerTypeSelectors.selectAllBuyerTypes,
  activeSeasonId: seasonSelectors.selectActiveSeasonId,
  seasons: seasonSelectors.selectSeasons,
  selectedSeason: seasonSelectors.selectActiveSeason,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PricingRules));
